import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../component/header/header";

const viewList = {
  l: "list",
  g: "grid"
};

function Home() {
  // const isLoggedIn = useSelector(state => state.loggedIn);
  // const [filter, setFilter] = useState("");
  // const [viewType, setViewType] = useState(viewList['l']);
  // const [title, setTitle] = useState('Keep')
  // const dispatch = useDispatch(null);
  

  // function logoutHandler() {
  //   dispatch({ type: "LOGOUT", payload: false });
  // }
  // console.log(isLoggedIn, '------->')
  return (
    <h1>hello u r inside home</h1>
    // <>
    //   <div>
    //     {isLoggedIn && (
    //       <div>
    //         <Header title={title}></Header>
    //         {/* <button onClick={logoutHandler}>Logout</button> */}
    //       </div>
    //     )}
    //   </div>
    //   {!isLoggedIn && <Redirect to="/"></Redirect>}
    // </>
  );
}

export default Home;
