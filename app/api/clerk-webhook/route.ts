import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    console.log("webhook was called")
    const payload = await req.json();
    const headersList = headers();
    const svixId = headersList.get('svix-id');
    const svixTimestamp = headersList.get('svix-timestamp');
    const svixSignature = headersList.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    let evt;

    try {
        evt = wh.verify(JSON.stringify(payload), {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature,
        }) as any;
    } catch (err) {
        return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
    }

    const { id, email_addresses, created_at, first_name, last_name } = evt.data;
    const email = email_addresses[0].email_address;

    // Create or update user in the database
    // await prisma.user.upsert({
    //     where: { clerkId: id },
    //     update: { email },
    //     create: {
    //         clerkId: id,
    //         email,
    //         role: 'reader', // Default role
    //         createdAt: new Date(created_at),
    //     },
    // });


    if (evt.type === "user.created" || evt.type === "user.updated") {
        const role = evt.data.public_metadata?.role || "READER"; // Default to READER
        await prisma.user.upsert({
            where: { clerkId: id },
            update: {
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`,
                role,
            },
            create: {
                clerkId: id,
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`,
                role,
            },
        });
    }


    return NextResponse.json({ success: true });
}