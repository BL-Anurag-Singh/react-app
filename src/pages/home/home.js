import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from '../../component/header/header'

function Home() {
  const isLoggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch(null);
  const title = 'Keep'
  console.log(isLoggedIn);

  function logoutHandler() {
    dispatch({ type: "LOGOUT", payload: false });
  }

  return (
    <>
      <div>
        {isLoggedIn && (
          <div>
            <Header title={title}></Header>
            {/* <button onClick={logoutHandler}>Logout</button> */}
          </div>
        )}
      </div>
      {!isLoggedIn && <Redirect to="/"></Redirect>}
    </>
  );
}

export default Home;
