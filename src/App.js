// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  // Initialize state for TODOs
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Function to add a new TODO
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  // Function to remove a TODO
  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>TODO App</h1>
      <div className="todo-container">
        <input
          type="text"
          placeholder="Enter a new TODO"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => removeTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;