import React, { useState } from "react";
import { FormField } from "rmwc";
import { useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler(e) {
    e.preventDefault();
    dispatch({
      type: "LOGIN",
      payload: true
    });
    history.push("/home");
  }

  function userNameHandler(e) {
    setName(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  function routeHandler(type) {
    if (type === "forgot") {
      history.push("/forgot");
    } else {
      history.push("/signup");
    }
  }
  return (
    <div>
      {/* <h3>Mehhage: {useContext(messageContext)}</h3> */}
      <img src={logo} className="App-logo" alt="logo" />
      <form>
        <FormField>
          <label htmlFor="input">User Name</label>
          <input
            onChange={userNameHandler}
            type="text"
            id="input"
            value={name}
            style={{ color: "black" }}
          />
        </FormField>
        <FormField>
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordHandler}
            type="password"
            value={password}
            id="password"
            style={{ color: "black" }}
          />
        </FormField>
        <button
          onClick={loginHandler}
          style={{ color: "black" }}
          disabled={!name}
        >
          Submit
        </button>
      </form>

      <ul>
        <li onClick={() => routeHandler("forgot")}>Forgot</li>
        <li onClick={() => routeHandler("signup")}>signUp</li>
      </ul>
    </div>
  );
}

export default Login;
