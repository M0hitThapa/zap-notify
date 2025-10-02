import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async () => {
  const auth = await currentUser();
  if (!auth) {
    return Response.json(
      {
        success: false,
        message: "user is not logged in",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "user not found",
      },
      {
        status: 400,
      }
    );
  }

  const categories = await prisma.eventCategory.createMany({
    data: [
      {
        name: "Bug",
        emoji: "🐛",
        color: 0xff6b6b,
      },
      {
        name: "Sale",
        emoji: "💰",
        color: 0xffeb3b,
      },
      {
        name: "Question",
        emoji: "🤔",
        color: 0x6c5ce7,
      },
    ].map((category) => ({
      ...category,
      userId: user.id,
    })),
  });

  return Response.json({
    success: true,
    count: categories.count,
  });
};
