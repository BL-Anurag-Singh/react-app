import React, { useState, useEffect, useRef, createRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export default function EditLabelDialog(props) {
  const [addLabel, setAddLabel] = useState(true);
  const [labelValue, setLabelValue] = useState("");
  const [editLabel, setEditLabel] = useState(true);
  const inputRef = createRef();
  // function changeEditLabelLayout() {
  //   console.log(labelValue);
  //   setAddLabel(true);
  // }

  function changeAddLabeleLayout() {
    setAddLabel(false);
    setLabelValue("");
  }

  function addNewLabel(e) {
    setLabelValue(e.target.value);
  }

  function onKeyChange(e) {
    if (labelValue && e.key === "Enter") {
      props.onLabelChange({
        title: e.target.value,
        index:
          props.labelList && props.labelList.length
            ? props.labelList.length + 1
            : 1
      });
      setLabelValue("");
    }
  }

  function onCloseIconClick() {
    setLabelValue("");
    setAddLabel(true);
  }

  function onCheckIconClick() {
    props.onLabelChange({
      title: labelValue,
      index:
        props.labelList && props.labelList.length
          ? props.labelList.length + 1
          : 1
    });
    setLabelValue("");
  }

  function updateExistingLabel(type, label) {
    type === "edit" ? setEditLabel(false) : setEditLabel(true);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [addLabel]);

  return (
    <Dialog open={props.open}>
      <DialogTitle id="simple-dialog-title">Edit Labels</DialogTitle>
      <div style={{ display: "flex" }}>
        {!addLabel && (
          <div>
            <button
              onClick={onCloseIconClick}
              style={{
                border: "none",
                backgroundColor: "transparent",
                margin: "0 5px",
                outline: "none"
              }}
            >
              <CloseIcon></CloseIcon>
            </button>
            <input
              type="text"
              ref={inputRef}
              value={labelValue}
              onKeyPress={onKeyChange}
              onChange={addNewLabel}
              placeholder="Create new Label"
            />
            <button
              onClick={onCheckIconClick}
              style={{
                border: "none",
                backgroundColor: "transparent",
                margin: "0 5px",
                outline: "none"
              }}
            >
              <CheckIcon></CheckIcon>
            </button>
          </div>
        )}
        {addLabel && (
          <div onClick={changeAddLabeleLayout}>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                margin: "0 5px",
                outline: "none"
              }}
            >
              <AddIcon></AddIcon>
            </button>
            <h4 style={{ margin: "0" }}>Create new label</h4>
          </div>
        )}
      </div>
      {props.labelList.map(label => (
        <li key={label.index} style={{ listStyleType: "none" }}>
          <div>
            <LabelIcon className="sidebar-icon" />

            {editLabel && <ViewLabelDialog key={`display-${label.index}`} label={label}/>}
            {!editLabel && <EditLabelDialog1 key={`edit-${label.index}`} label={label}/>}
          </div>
        </li>
      ))}
      <button onClick={props.closeDialog}>Done</button>
    </Dialog>
  );
}

function ViewLabelDialog({label}) {
  function updateExistingLabel() {
    // console.log("hello");
  }

  return (
    <div>
      <span>{label.title}</span>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          margin: "0 5px",
          outline: "none"
        }}
        onClick={() => updateExistingLabel("edit", label)}
      >
        <EditIcon></EditIcon>
      </button>
    </div>
  );
}

function EditLabelDialog1({label}) {
  function updateExistingLabel() {
    // console.log("hello");
  }
  return (
    <div>
      <input value={label.title} />
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          margin: "0 5px",
          outline: "none"
        }}
        onClick={() => updateExistingLabel("save", label)}
      >
        <CheckIcon></CheckIcon>
      </button>
    </div>
  );
}
