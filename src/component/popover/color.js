import React from "react";
import Popover from "@material-ui/core/Popover";
import CheckIcon from "@material-ui/icons/Check";

const colorList = [
  {
    value: "#ffffff",
    isSelected: false
  },
  {
    value: "#f28b82",
    isSelected: false
  },
  {
    value: "#fbbc04",
    isSelected: false
  },
  {
    value: "#fff475",
    isSelected: false
  },
  {
    value: "#ccff90",
    isSelected: false
  },
  {
    value: "#a7ffeb",
    isSelected: false
  },
  {
    value: "#cbf0f8",
    isSelected: false
  },
  {
    value: "#aecbfa",
    isSelected: false
  },
  {
    value: "#d7aefb",
    isSelected: false
  },
  {
    value: "#fdcfe8",
    isSelected: false
  },
  {
    value: "#e6c9a8",
    isSelected: false
  },
  {
    value: "#e8eaed",
    isSelected: false
  }
];

export default function ColorPopup(props) {
  function onClose() {}

  function onClickHandler(item) {
    colorList.map(val => {
      val.isSelected = false;
      if (val.value === item.value) {
        val.isSelected = true;
      }
      return val;
    });
    props.handleClose(item);
  }

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
      <div
        style={{
          display: "flex",
          height: "100px",
          padding: "12px",
          width: "150px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {colorList.map(color => (
          <Color key={color.value} color={color} onClick={onClickHandler} />
        ))}
      </div>
    </Popover>
  );
}

function Color({ color, onClick }) {
  return (
    <div
      style={{
        height: "25px",
        width: "25px",
        backgroundColor: `${color.value}`,
        margin: "5px",
        borderRadius: "50px"
      }}
      onClick={() => onClick(color)}
    >
      {color.isSelected && <CheckIcon></CheckIcon>}
    </div>
  );
}
