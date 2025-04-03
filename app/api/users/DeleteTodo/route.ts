import { NextResponse } from "next/server";

import { prisma } from "../../../../prisma/setup";

export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();
    console.log(id);
    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 500 });
    }
    const response = await prisma.todo.delete({ where: { id: id } });
    if (!response) {
      return NextResponse.json({ error: "Item not deleted" }, { status: 500 });
    }
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to delete", error);
    return NextResponse.json(error);
  }
};
