let initialState = {
  loggedIn: true
};

function reducer(state = initialState, action) {
  switch (action && action.type) {
    case "LOGIN":
      return { loggedIn: action.payload };
    case "LOGOUT":
      return { loggedIn: action.payload };
    default:
      return initialState;
  }
}

export default reducer;
