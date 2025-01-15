import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch activity log
export async function GET() {
    const logs = await prisma.activity.findMany({
        orderBy: { timestamp: "desc" },
    });

    return NextResponse.json(logs);
}
