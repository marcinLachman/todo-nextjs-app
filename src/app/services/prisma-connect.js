import prisma from "./prisma.js";

export async function connect() {
  try {
    await prisma.$connect;
  } catch (error) {
    return Error(`Database connext Error: ${error}`);
  }
}
