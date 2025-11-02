import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const id = Number((await params).id);
        const user = await prisma.user.findFirst({ where: { id } });
        return NextResponse.json({ message: "success", user: user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "error", err }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const id = Number((await params).id);
        const { name, password, completedStageIds } = await req.json();
        const user = await prisma.user.update({
            data: { name, password, completedStageIds },
            where: { id },
        });
        return NextResponse.json({ message: "success", user: user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "error", err }, { status: 500 });
    }
};

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const id = Number((await params).id);
        const user = await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: "success", user: user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "error", err }, { status: 500 });
    }
};
