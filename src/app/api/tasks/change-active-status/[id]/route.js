import { NextResponse } from "next/server";
import { connect } from "@/app/services/prisma-connect";
import prisma from "@/app/services/prisma";

export const PUT = async (request) => {
  try {
    const id = request.url.split("/tasks/change-active-status/")[1];
    const { isActive } = await request.json();
    await connect();

    const task = await prisma.tasks.update({
      data: {
        isActive,
      },
      where: { id },
    });

    return NextResponse.json(
      { message: "Success updated task", task },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant update task: ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
};
