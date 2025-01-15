import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const { type } = await req.json();
        const article = await prisma.article.update({
            where: { id: params.id },
            data: {
                likes: type === "like" ? { increment: 1 } : undefined,
                dislikes: type === "dislike" ? { increment: 1 } : undefined,
            },
        });

        return NextResponse.json(article);

    } catch (error) {
        console.log("ERROR +=> \n", error);
        return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
    }

}

// import prisma from "@/lib/prisma";
// import { NextApiRequest } from "next";

// export const POST = async (req: NextApiRequest, res: Response, { params }: { params: { id: string } }) => {
//     try {

//         console.log(params);
//         const { type } = await req.body;
//         // const id = params.id;

//         const article = await prisma.article.update({
//             where: { id: params.id },
//             data: {
//                 likes: type === "like" ? { increment: 1 } : undefined,
//                 dislikes: type === "dislike" ? { increment: 1 } : undefined,
//             },
//         });
//         console.log(article.likes);

//         return new Response(JSON.stringify(article), { status: 200 });
//     } catch (error) {
//         console.log("ERROR +=> \n", error);
//         return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
//     }
// }
// // export async function POST(req: Request, { params }: { params: { id: string } }) {
// //     const { type } = await req.json();

// //     const article = await prisma.article.update({
// //         where: { id: params.id },
// //         data: {
// //             likes: type === "like" ? { increment: 1 } : undefined,
// //             dislikes: type === "dislike" ? { increment: 1 } : undefined,
// //         },
// //     });

// //     return NextResponse.json(article);
// // }