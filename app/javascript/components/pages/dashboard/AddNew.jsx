import React, { useState, useContext } from "react";
import axios from "axios";
import { TodosContext } from "../../TodoApp";

export const AddNew = () => {
  const { todos, handleTodosChange } = useContext(TodosContext)
  const [task, setTask] = useState('')

  const createTask = async () => {
    const newTodo = { task, is_done: false }
    const response = await axios.post('/api/todos', { todo: newTodo })
    if (response.status === 201) {
      newTodo.id = response.data.todo.id
    }
    handleTodosChange(todos.concat(newTodo))
    setTask('')
  }

  return (
    <div className="todo-new">
      <input type="text" className="text-input" value={task} onChange={(e) => setTask(e.target.value)}/>
      <button className="todo-button" onClick={createTask}>Add new</button>
    </div>
  );
};
