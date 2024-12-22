const initialState = {
  searchQuery: "",
  isSorted: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "TOGGLE_SORT":
      return { ...state, isSorted: !state.isSorted };
    default:
      return state;
  }
};

export const setSearchQuery = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

export const toggleSort = () => ({
  type: "TOGGLE_SORT",
});

export default filterReducer;
