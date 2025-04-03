import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/setup";

export const GET = async () => {
  try {
    const fetchedTodos = await prisma.todo.findMany();

    if (!fetchedTodos) {
      return NextResponse.json(
        { error: "Todos not fetched." },
        { status: 500 }
      );
    }

    console.log("Todo could not be fetched", fetchedTodos);

    return NextResponse.json(fetchedTodos);
  } catch (error) {
    console.error("Error fetching data", error);
    return NextResponse.json({ message: "Failed to fetch todos", status: 500 });
  }
};
