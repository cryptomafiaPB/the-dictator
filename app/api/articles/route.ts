import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
    try {
        const articles = await prisma.article.findMany();
        return new Response(JSON.stringify(articles), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
    }
}