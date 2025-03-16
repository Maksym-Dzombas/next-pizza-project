import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
  const users = await prisma.user.findMany();

  return NextResponse.json({
    users: users,
    message: "Успешное получение пользователей"
  });
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data
    });

    return NextResponse.json({
      user: user,
      message: "Успешное создание пользователя"
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({
        message: "Такой пользователь уже существует"
      })
    }
  }
}