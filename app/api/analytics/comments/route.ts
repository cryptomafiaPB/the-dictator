/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    const commentsByDay = await prisma.comment.groupBy({
        by: ["createdAt"],
        _count: true,
        where: {
            createdAt: {
                gte: lastWeek,
            },
        },
    });

    const formattedComments = commentsByDay.map((entry: any) => ({
        date: entry.createdAt.toISOString().split("T")[0],
        count: entry._count,
    }));

    return NextResponse.json({ commentsByDay: formattedComments });
}
