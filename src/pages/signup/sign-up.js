import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormField } from "rmwc";

function SignUp() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpwd, setCnfPwd] = useState('');

  function signUpHandler(e) {
    if(password !== cnfpwd) {
        return
    }
    e.preventDefault();
    console.log("user values", name, password);
  }

  function userNameHandler(e) {
    setName(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  function confirmPasswordHandler(e) {
    setCnfPwd(e.target.value);
  }

  function backToLoginHandler() {
    history.push('/');
  }

  return (
    <div>
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

        <FormField>
          <label htmlFor="cnfpwd">Confirm Password</label>
          <input
            onChange={confirmPasswordHandler}
            type="password"
            value={cnfpwd}
            id="cnfpwd"
            style={{ color: "black" }}
          />
        </FormField>
        {password !== cnfpwd && <h4>Make sure password and confirm password are same</h4>}
        <button onClick={signUpHandler} style={{ color: "black" }}>
          sign up
        </button>
      </form>
      <button onClick={backToLoginHandler}>Back to login</button>
    </div>
  );
}

export default SignUp;
