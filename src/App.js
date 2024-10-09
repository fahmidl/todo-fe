import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log('Backend URL:', backendUrl);

axios.get(`${backendUrl}/todos`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching todos', error);
  });

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({ id: null, title: "" });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(`${backendUrl}/todos`, {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const updateTodo = async (id, completed) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    try {
      await axios.put(`${backendUrl}/todos/${id}`, { title: todoToUpdate.title, completed });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo));
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${backendUrl}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const startEditTodo = (id, title) => {
    setEditTodo({ id, title });
  };

  const saveEditTodo = async () => {
    console.log(`Saving edit for todo with id: ${editTodo.id}, title: ${editTodo.title}`); // Log data
    const todoToEdit = todos.find(todo => todo.id === editTodo.id);
    try {
      await axios.put(`${backendUrl}/todos/${editTodo.id}`, { title: editTodo.title, completed: todoToEdit.completed });
      setTodos(todos.map(todo => todo.id === editTodo.id ? { ...todo, title: editTodo.title } : todo));
      setEditTodo({ id: null, title: "" });
    } catch (error) {
      console.error("Error editing todo", error);
    }
  };

  return (
    <Container>
      <Box mt={10}> {/* Add margin top */}

        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <TextField
          label="Add new todo"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add
        </Button>
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          startEditTodo={startEditTodo}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          saveEditTodo={saveEditTodo}
        />
      </Box>
    </Container>
  );
}

export default App;