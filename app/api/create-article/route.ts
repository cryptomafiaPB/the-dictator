// import prisma from '@/lib/prisma';

// export const POST = async (req: Request, res: Response) => {
//     try {
//         const { content } = req.body;

//         // Get the user from the request (you might need to adapt this based on your authentication setup)
//         const user = req.user; // Assuming you have middleware to attach user to the request

//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }


//         const dbUser = await prisma.user.findUnique({
//             where: { clerkId: user.id },
//         });

//         if (!dbUser) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const newArticle = await prisma.article.create({
//             data: {
//                 title: 'New Article', // Replace with actual title
//                 content,
//                 slug: 'new-article', // Generate a unique slug
//                 authorId: dbUser.id,
//             },
//         });

//         return new Response(JSON.stringify(users), { status: 200 });
//     } catch (error) {
//         console.log("ERROR +=> \n", error);
//         return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });
//     }
// }