import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true
      }
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error("[GET STORIES] Error: ", error);
  }
}