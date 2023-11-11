import { NextResponse } from "next/server";
import { connect } from "@/app/services/prisma-connect";
import prisma from "@/app/services/prisma";

export const GET = async (request) => {
  try {
    const id = request.url.split("/tasks/get-all-tasks/")[1];
    await connect();

    const task = await prisma.tasks.findFirst({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ message: "Task Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success get task", task },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant get task: ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
};
