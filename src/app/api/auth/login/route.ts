import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json(
        { message: "ユーザー名とパスワードは必須です" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // パスワードは返さないようにする
        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(
          { message: "success", user: userWithoutPassword },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "ユーザー名またはパスワードが正しくありません" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "ユーザー名またはパスワードが正しくありません" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};
