import { NextResponse } from "next/server";
import { connect } from "@/app/services/prisma-connect";
import prisma from "@/app/services/prisma";

export const GET = async () => {
  try {
    await connect();
    const tasks = await prisma.tasks.findMany();
    return NextResponse.json(
      { message: "Success get all tasks", tasks },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant get all tasks: ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
};
