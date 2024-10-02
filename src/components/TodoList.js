import React from "react";
import TodoItem from "./TodoItem";
import { List } from "@mui/material";

function TodoList({ todos, updateTodo, deleteTodo, startEditTodo, editTodo, setEditTodo, saveEditTodo }) {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          startEditTodo={startEditTodo}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          saveEditTodo={saveEditTodo}
        />
      ))}
    </List>
  );
}

export default TodoList;