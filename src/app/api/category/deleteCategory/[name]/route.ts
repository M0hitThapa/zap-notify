import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = async (req:Request, { params }: { params: { name: string } }) => {
  try {
    const auth = await currentUser();
    
    if (!auth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        externalId: auth.id
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { name } = params;

    if (!name) {
      return NextResponse.json(
        { message: "Missing category name" },
        { status: 400 }
      );
    }

    await prisma.eventCategory.delete({
      where: {
        name_userId: {
          name,
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
