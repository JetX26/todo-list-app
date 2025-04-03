import React, { ReactNode } from "react";

interface TodoProps {
  children: ReactNode;
}

function Todo({ children }: TodoProps) {
  return <div className="border-1 p-2 rounded-md ">{children}</div>;
}

export default Todo;
