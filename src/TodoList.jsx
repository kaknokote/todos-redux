import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSorted, setIsSorted] = useState(false);
  const API_URL = 'http://localhost:5000/todos';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error('Ошибка загрузки данных:', error));
  }, []);

  const addTodo = () => {
    const newTask = { title: newTodo, completed: false };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((task) => setTodos([...todos, task]));
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const updateTodo = (id, updatedTitle) => {
    const updatedTask = { title: updatedTitle, completed: false };
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((task) =>
        setTodos(todos.map((todo) => (todo.id === id ? task : todo)))
      );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  return (
    <div>
      <input
        type="text"
        placeholder="Добавить задачу..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo} className={'.button'}>
        Добавить
      </button>
      <br></br>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => setIsSorted(!isSorted)} className={'.button'}>
        {isSorted ? "Отключить сортировку" : "Сортировать по алфавиту"}
      </button>

      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              defaultValue={todo.title}
              onBlur={(e) => updateTodo(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default TodoList;
