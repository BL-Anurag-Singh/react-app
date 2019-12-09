import React, { useState } from "react";
import { FormField } from "rmwc";

function Forgot() {
  const [email, setEmail] = useState("");

  function emailHandler(e) {
    setEmail(e.target.value);
  }

  function sendEmailHandler() {
      console.log(email)
  }

  return (
    <div>
      <FormField>
        <label htmlFor="email">Email</label>
        <input
          onChange={emailHandler}
          type="email"
          value={email}
          id="email"
          style={{ color: "black" }}
        />
        <button onClick={sendEmailHandler}>Send email</button>
      </FormField>
    </div>
  );
}

export default Forgot;
