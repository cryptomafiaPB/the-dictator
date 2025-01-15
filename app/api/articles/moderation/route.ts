import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Approve or reject an article
export async function PUT(req: Request) {
    const { articleId, status } = await req.json();

    const updatedArticle = await prisma.article.update({
        where: { id: articleId },
        data: { published: status === "approve" },
    });

    return NextResponse.json({ article: updatedArticle });
}
