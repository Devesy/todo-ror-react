import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { TodosContext } from "../../TodoApp";

export const Todo = ({ id, task: originalTask, is_done }) => {
  const { todos, handleTodosChange } = useContext(TodosContext)
  const [task, setTask] = useState(originalTask)
  const [done, setDone] = useState(is_done)
  const [edit, setEdit] = useState(false)
  const editInputRef = useRef(null);

  const changeDone = async () => {
    const newDone = !done
    const response = await axios.put(`/api/todos/${id}`, { todo: { is_done: newDone } })
    if (response.status === 200) {
      const todo = todos.find(({ id: sourceId }) => sourceId === id)
      if (todo) {
        todo.is_done = newDone
        handleTodosChange(todos)
        setDone(newDone)
      }
    }
  }

  const clickEdit = () => {
    setTask(task)
    setEdit(true)
  }

  const clickCancel = () => {
    setTask(originalTask)
    setEdit(false)
  }

  const clickDelete = async () => {
    const response = await axios.delete(`/api/todos/${id}`)
    if (response.status === 200) {
      handleTodosChange(todos.filter(({ id: sourceId }) => sourceId !== id))
    }
  }

  useEffect(() => {
    if (edit && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [edit]);

  const updateTask = async () => {
    const response = await axios.put(`/api/todos/${id}`, { todo: { task } })
    if (response.status === 200) {
      const todo = todos.find(({ id: sourceId }) => sourceId === id)
      if (todo) {
        todo.task = task
        handleTodosChange(todos)
      }
    }
    setEdit(false)
  }

  let taskOrEdit = <span>{task}</span>
  let editOrCancel = <button className="todo-button" onClick={clickEdit}>edit</button>
  let saveButton = null
  if (edit) {
    taskOrEdit = <input type="text" className="text-input" value={task} ref={editInputRef} onChange={(e) => setTask(e.target.value)} />
    editOrCancel = <button className="todo-button" onClick={clickCancel}>cancel</button>
    saveButton = <button className="todo-button" onClick={updateTask}>save</button>
  }

  return (
    <div className="todo-item">
      <div className="todo-content">
        <label>
          <input type="checkbox" checked={done} onChange={changeDone} />
          <div className="todo-mark" />
        </label>
        {taskOrEdit}
      </div>
      <div className="todo-actions">
        {editOrCancel}
        {saveButton}
        <button className="todo-button" onClick={clickDelete}>delete</button>
      </div>
    </div>
  );
};
