import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.scss";
import { useSelector } from "react-redux";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/sign-up";
import Forgot from "./pages/forgot/forgot";
import Home from "./pages/home/home";

const PrivateRouter = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function App() {
  const isLoggedIn = useSelector(state => state.loggedIn);
  console.log(isLoggedIn,'---------->')
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Route path="/" exact component={Login}></Route>
          <Route path="/signup" exact component={SignUp}></Route>
          <Route path="/forgot" exact component={Forgot}></Route>
          <PrivateRouter
            isLoggedIn={isLoggedIn}
            path="/home"
            exact
            component={Home}
          ></PrivateRouter>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
