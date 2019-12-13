import React, { useState, useEffect } from "react";
// import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import "./header.scss";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

function Header(props) {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch(null);
  function logoutUser() {
    dispatch({ type: "LOGOUT", payload: false });
  }

  useEffect(() => {
    onBlurEvent()
  }, [])

  function onBlurEvent(e) {
    document.getElementById("searchDiv").style.backgroundColor =
      "rgb(241, 243, 244)";
    document.getElementById("search").style.backgroundColor =
      "rgb(241, 243, 244)";
  }

  function onSearchClick(e) {
    document.getElementById("searchDiv").style.background = "white";
    document.getElementById("searchDiv").style.boxShadow = '0 1px 1px 0 rgba(65,69,73,0.1), 0 1px 3px 1px rgba(65,69,73,0.15)';
    document.getElementById("search").style.background = "white";
  }

  function onSearchTextChange(e) {
    console.log(e);
  }

  return (
    <>
      <div className="navbar">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "50px"
          }}
        >
          <MenuIcon className="toggle-icon" onClick={props.onMenuIconClick} />
          <h3 style={{ width: "115px", textAlign: "left" }}>{props.title}</h3>
        </div>

        <div
          id="searchDiv"
          style={{
            display: "flex",
            padding: "0px 10px",
            height: "53px",
            borderRadius: "5px",
            width: "420px"
          }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              margin: "0 5px",
              outline: "none"
            }}
          >
            <SearchIcon className="toogle-icon" />
          </button>
          <div style={{ padding: "16px 0", width: "100%", height: "auto" }}>
            <input
              id="search"
              onClick={onSearchClick}
              onBlur={onBlurEvent}
              type="text"
              value={searchValue}
              onChange={onSearchTextChange}
              placeholder="Search"
              style={{
                border: "none",
                outline: "none",
                height: "100%",
                width: "100%"
              }}
              onChange={props.onSearchValueChange}
            />
          </div>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              margin: "0 5px",
              outline: "none"
            }}
          >
            <CloseIcon className="toogle-icon" />
          </button>
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          {props.viewType === "list" ? (
            <ViewStreamIcon
              className="toggle-icon"
              onClick={() => props.onViewTypeChange(props.viewType)}
            />
          ) : (
            <ViewModuleIcon
              className="toggle-icon"
              onClick={() => props.onViewTypeChange(props.viewType)}
            />
          )}
          <SettingsIcon className="toggle-icon" />
        </div>
        <div>
          <button
            style={{
              border: "1px solid grey",
              backgroundColor: "rgb(241, 243, 244)",
              margin: "0px 5px",
              height: "35px",
              width: "75px",
              fontWeight: "800",
              borderRadius: "5px"
            }}
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
