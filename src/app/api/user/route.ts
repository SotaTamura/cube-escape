import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export const GET = async (_req: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(
      { message: "success", users: users },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { name },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "このユーザー名は既に使用されています" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: { name, password: hashedPassword },
    });
    return NextResponse.json(
      { message: "success", user: user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};
