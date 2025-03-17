import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ message: "Вы не авторизованы" }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id)
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      }
    });

    return NextResponse.json(data); 
  } catch (error) {
    console.error("[GET USER] Error: ", error);
  }
}