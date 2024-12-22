import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from './todosReducer';
import { setSearchQuery, toggleSort } from './filterReducer';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const loading = useSelector((state) => state.todos.loading);
  const searchQuery = useSelector((state) => state.filter.searchQuery);
  const isSorted = useSelector((state) => state.filter.isSorted);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (title) => {
    const newTodo = { title, completed: false };
    dispatch(addTodo(newTodo));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  return (
    <div>
      {loading && <p>Loading...</p>}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <button onClick={() => dispatch(toggleSort())}>
        {isSorted ? 'Disable Sorting' : 'Sort Alphabetically'}
      </button>
      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              defaultValue={todo.title}
              onBlur={(e) => dispatch(updateTodo(todo.id, { ...todo, title: e.target.value }))}
            />
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add new todo..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAddTodo(e.target.value);
        }}
      />
    </div>
  );
};

export default TodoList;
