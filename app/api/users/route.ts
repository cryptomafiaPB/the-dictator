import prisma from "@/lib/prisma";
import { Role } from "@/types";
// import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { search, role: roleParam, page, limit } = Object.fromEntries(new URL(req.url).searchParams);
    const role = roleParam ? (roleParam as Role) : undefined;

    const pageNumber = parseInt(page || "1", 10);
    const pageSize = parseInt(limit || "10", 10);

    const users = await prisma.user.findMany({
        where: {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ],
            }),
            ...(role && { role }),
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isBanned: true,
            createdAt: true,
        },
    });

    const totalUsers = await prisma.user.count();

    return NextResponse.json({ users, totalUsers });
}
