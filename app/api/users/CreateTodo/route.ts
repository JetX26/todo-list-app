import { NextResponse } from "next/server";

import { prisma } from "../../../../prisma/setup";

export const POST = async (req: Request) => {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message not sent" }, { status: 500 });
    }
    const newTodo = await prisma.todo.create({
      data: {
        message: message,
      },
    });

    if (!newTodo) {
      return NextResponse.json(
        { error: "Message not created." },
        { status: 500 }
      );
    }

    console.log("Todo was added.", newTodo);
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error("Error creating todo.", error);
    return NextResponse.json(
      { error: "Failed to create Todo" },
      { status: 500 }
    );
  }
};
