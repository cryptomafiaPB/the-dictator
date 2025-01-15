/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";

interface Article {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export async function GET(req: Request) {
    try {
        const latest: Article[] = await prisma.article.findMany({
            where: {
                published: true,
                // old articles don't have a status field
                // status: "published",
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        return new Response(JSON.stringify(latest), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {

    }
}