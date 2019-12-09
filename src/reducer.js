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
      return { loggedIn: true };
  }
}

export default reducer;
