import React, { useContext } from "react";
import { Todo } from "./Todo";
import { FiltersContext, TodosContext } from "../../TodoApp";

export const TodoList = () => {
  const { todos } = useContext(TodosContext)
  const { filters: { search, type } } = useContext(FiltersContext)

  let filtered = todos
  if (type === 'completed') {
    filtered = filtered.filter(({ is_done }) => is_done)
  } else if (type === 'incompleted') {
    filtered = filtered.filter(({ is_done }) => !is_done)
  }

  if (search.length) {
    filtered = filtered.filter(({ task }) => task.includes(search))
  }

  const list = filtered.map((todo) => {
    return <Todo key={todo.id} {...todo} />
  })

  return (
    <div>
      {list}
    </div>
  );
};
