import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton, TextField, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function TodoItem({ todo, updateTodo, deleteTodo, startEditTodo, editTodo, setEditTodo, saveEditTodo }) {
  return (
    <ListItem
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      secondaryAction={
        <>
          {editTodo.id === todo.id ? (
            <>
              <Button onClick={saveEditTodo}>Save</Button>
            </>
          ) : (
            <>
              <IconButton edge="end" onClick={() => startEditTodo(todo.id, todo.title)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </>
          )}
        </>
      }
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => updateTodo(todo.id, !todo.completed)}
      />
      {editTodo.id === todo.id ? (
        <TextField
          value={editTodo.title}
          onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
        />
      ) : (
        <ListItemText primary={todo.title} />
      )}
    </ListItem>
  );
}

export default TodoItem;