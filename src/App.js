import React, {useRef, useEffect} from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
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

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

function App() {
  const isLoggedIn = useSelector(state => state.loggedIn);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/signup" exact component={SignUp}></Route>
            <Route path="/forgot" exact component={Forgot}></Route>
            <PrivateRouter
              isLoggedIn={isLoggedIn}
              path="/home"
              exact
              component={Home}
            ></PrivateRouter>
            <Route component={NoMatch} />
            
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

// function App() {
//   const observed = useRef(null);

//   useEffect(() => {
//     console.log(observed.current);
//   }, []);

//   return (
//     <div ref={observed} className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

export default App;
