import prisma from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
export const GET = async (req: Request) => {
    try {
        const users = await prisma.user.findMany();

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.log("ERROR +=> \n", error);
        return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
    }
}

// export const GET = async (req: Request, res: Response) => {
//     try {
//         return new Response("This is a GET request", { status: 200 })
//     } catch (error) {
//         console.log(error);
//         return new Response("Internal Server GET Error", { status: 500 })
//     }
// }