import { useState, useEffect } from 'react';
import './TodoList.css';

export const TodoList = () => {
  
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then((response) => response.json())
          .then((data) => {
              setTodos(data);
          })
          .catch((error) => console.error('Ошибка при загрузке данных:', error));
      }, []);

    return (
    <div>
        <h1>Todo List</h1>
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    </div>
    );
}

