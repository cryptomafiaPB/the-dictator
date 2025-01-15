import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    // Fetch top 5 most viewed articles
    const mostViewedArticles = await prisma.article.findMany({
        orderBy: { views: "desc" },
        take: 5,
        select: {
            title: true,
            views: true,
        },
    });

    // Fetch user role distribution
    const userRoles = await prisma.user.groupBy({
        by: ["role"],
        _count: true,
    });

    // Fetch article engagement trends
    const engagementTrends = await prisma.article.groupBy({
        by: ["createdAt"],
        _sum: { likes: true, dislikes: true },
        where: {
            createdAt: { gte: lastWeek },
        },
    });

    // Fetch daily comments activity
    const commentsActivity = await prisma.comment.groupBy({
        by: ["createdAt"],
        _count: true,
        where: {
            createdAt: { gte: lastWeek },
        },
    });

    return NextResponse.json({
        mostViewedArticles,
        userRoles,
        engagementTrends,
        commentsActivity,
    });
}
