import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/sign-up";
import Forgot from "./pages/forgot/forgot";
import messageContext from "./context/messageContext";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {/* <messageContext.Provider value='hello this is a test for createContext hook'> */}
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <Route path="/" exact component={Login}></Route>
            <Route path="/signup" exact component={SignUp}></Route>
            <Route path="/forgot" exact component={Forgot}></Route>
            <Route path="/home" exact component={Home}></Route>
          {/* </messageContext.Provider> */}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
