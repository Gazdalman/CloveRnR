const SEARCH = 'search/SEARCH'

const setResults = (results) => ({
  type: SEARCH,
  results
})

export const getResults = (paginate) => async (dispatch) => {
  const res = await fetch(`/api/projects/search?${paginate}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setResults(data));
    return "ok"
  }

  return "nope"
}

const initialState = [];

const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return [...action.results]
    default:
      return state;
  }
}

export default searchResults;
