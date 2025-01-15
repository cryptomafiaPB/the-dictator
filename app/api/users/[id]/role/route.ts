import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { role } = await req.json();

    if (!["admin", "editor", "reader"].includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const user = await prisma.user.update({
        where: { id: params.id },
        data: { role },
    });

    return NextResponse.json(user);
}
