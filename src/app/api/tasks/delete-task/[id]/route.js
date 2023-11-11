import { NextResponse } from "next/server";
import { connect } from "@/app/services/prisma-connect";
import prisma from "@/app/services/prisma";

export const DELETE = async (request) => {
  try {
    const id = request.url.split("/tasks/delete-task/")[1];
    await connect();

    const task = await prisma.tasks.delete({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ message: "Task Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success delete task" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant delete task: ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
};
