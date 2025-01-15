import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                while (true) {
                    const totalUsers = await prisma.user.count();
                    const totalArticles = await prisma.article.count();
                    const totalComments = await prisma.comment.count();
                    const totalViews = await prisma.article.count()

                    const data = JSON.stringify({
                        totalUsers,
                        totalArticles,
                        totalComments
                    });

                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            } catch (error) {
                controller.error(error);
            }
        },
        cancel() {
            // Cleanup if needed
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}