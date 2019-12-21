import React, { useState, Fragment, useEffect, useRef } from "react";
import Popover from "@material-ui/core/Popover";

export default function ColorPopup(props) {
  const [color, setColor] = useState("");

  function onClose() {
    console.log("ssss");
  }

  useEffect(() => {
    console.log(props, "ssssssssssssssssss------> ");
  });

  return (
    <Popover
      id="color"
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <h1>hello color</h1>
    </Popover>
  );
}
