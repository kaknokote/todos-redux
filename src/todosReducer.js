const initialState = {
  list: [],
  loading: false,
  error: null,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_TODOS_SUCCESS":
      return { ...state, loading: false, list: action.payload };
    case "FETCH_TODOS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TODO":
      return { ...state, list: [...state.list, action.payload] };
    case "DELETE_TODO":
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    default:
      return state;
  }
};

export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: "FETCH_TODOS_REQUEST" });
  try {
    const response = await fetch("http://localhost:5000/todos");
    const data = await response.json();
    dispatch({ type: "FETCH_TODOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE", payload: error.message });
  }
};

export const addTodo = (newTodo) => async (dispatch) => {
  const response = await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  const data = await response.json();
  dispatch({ type: "ADD_TODO", payload: data });
};

export const deleteTodo = (id) => async (dispatch) => {
  await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
  dispatch({ type: "DELETE_TODO", payload: id });
};

export const updateTodo = (id, updatedTodo) => async (dispatch) => {
  const response = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  const data = await response.json();
  dispatch({ type: "UPDATE_TODO", payload: data });
};

export default todosReducer;
