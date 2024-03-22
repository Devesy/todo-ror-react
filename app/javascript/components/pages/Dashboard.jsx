import React, { useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Status } from "./dashboard/Status";
import { TodoList } from "./dashboard/TodoList";
import { AddNew } from "./dashboard/AddNew";
import { Filters } from "./dashboard/Filters";
import { TodosContext } from "../TodoApp";

export const Dashboard = () => {
  const { todos, handleTodosChange } = useContext(TodosContext)

  const loadTodos = useCallback(async () => {
    const response = await axios.get(`/api/todos`);
    if (response.status === 200) {
      handleTodosChange(response.data.todos);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <>
      <Filters/>
      <br />
      <Status todos={todos} />
      <AddNew/>
      <br />
      <TodoList/>
    </>
  );
};
