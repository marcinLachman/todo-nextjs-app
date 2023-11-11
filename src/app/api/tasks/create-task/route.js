import { NextResponse } from "next/server";
import { connect } from "@/app/services/prisma-connect";
import prisma from "@/app/services/prisma";

export const POST = async (request) => {
  try {
    const { taskName, taskDescription, dateExpired } = await request.json();
    await connect();

    const task = await prisma.tasks.create({
      data: {
        taskName,
        taskDescription,
        dateExpired,
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
      },
    });
    return NextResponse.json(
      { message: "Success added task", task },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant post task: ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
};
