import React, { useContext } from "react";
import { TodosContext } from "../../TodoApp";

export const Status = () => {
  const { todos } = useContext(TodosContext)

  const completed = todos.filter(({ is_done }) => is_done).length
  const total = todos.length

  return (
    <div>
      Completed: {completed} / {total}
    </div>
  );
};
