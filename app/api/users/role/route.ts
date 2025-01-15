import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Promote user to a new role
export async function PUT(req: Request) {
    const { userId, newRole } = await req.json();

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
    });

    return NextResponse.json({ user: updatedUser });
}
