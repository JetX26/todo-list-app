"use client";

import { UserButton } from "@clerk/nextjs";
import Todo from "./components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const [fetchedTodo, setFetchedTodo] = useState<
    { id: string; message: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [todosPresent, setTodosPresent] = useState<boolean>(false);

  const handleCreateTodo = async () => {
    try {
      const { data } = await axios.post("/api/users/CreateTodo", {
        message: todoText,
      });

      setFetchedTodo((prevTodos) => [...prevTodos, data]);
      console.log("Todo was added.", data.message);
      setTodoText("");
      setTodosPresent(true);
    } catch (error) {
      console.error("Todo was not added.", error);
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get("/api/users/FetchTodo");
      setFetchedTodo(response.data);
      if (!response.data[0]) {
        setTodosPresent(false);
      } else {
        setTodosPresent(true);
      }
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Todos could not be fetched.", error);
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const { data } = await axios.post("/api/users/DeleteTodo", {
        id: id,
      });
      handleFetchData();
      console.log(data);
    } catch (error) {
      console.error("Todo could not be deleted.", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [todoText]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen p-6">
      <div className="w-full h-full flex flex-col gap-4">
        <UserButton
          appearance={{
            elements: {
              userButtonBox: "w-10 h-10",
              avatarBox: "w-10 h-10",
            },
          }}
        ></UserButton>
        <h1 className="text-2xl">To Do List</h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="border-1 p-1 rounded-md w-[25%]"
            placeholder="Enter your to do here..."
            value={todoText}
            onChange={(e) => {
              setTodoText(e.currentTarget.value);
              console.log(todoText);
            }}
          />
          <button
            onClick={handleCreateTodo}
            className="p-1 border-1 rounded-md hover:cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="break-words h-[20%] max-h-[35%] grid grid-cols-4 gap-4 ">
          {todosPresent ? (
            fetchedTodo.map((item) => (
              <Todo key={item.id}>
                <span className="flex justify-end border-b-2 mb-2">
                  <button
                    className=" hover:cursor-pointer"
                    onClick={() => {
                      handleDeleteTodo(item.id);
                    }}
                  >
                    X
                  </button>
                </span>
                <p>{item.message}</p>
              </Todo>
            ))
          ) : (
            <h1>Todo list is empty</h1>
          )}
        </div>
      </div>
    </div>
  );
}
