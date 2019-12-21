import React, { useState, useEffect, useRef, createRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";

export default function EditLabelDialog(props) {
  let editedLabel = "";
  const [addLabel, setAddLabel] = useState(true);

  const [labelValue, setLabelValue] = useState("");
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
      props.newLabelHandler({
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
    props.newLabelHandler({
      title: labelValue,
      index:
        props.labelList && props.labelList.length
          ? props.labelList.length + 1
          : 1
    });
    setLabelValue("");
  }

  function changeLabelIconHandler(label, type) {
    props.editLabelHandler(label, type);
  }

  function mouseHoverHandler(label) {
    props.editLabelHandler(label, "hover");
  }

  function mouseLeaveHandler(label) {
    props.editLabelHandler(label, "leave");
  }

  function labelChangeHandler(e) {
    editedLabel = e.target.value;
    console.log(e);
  }

  function updateLabelHandler(label, e) {
    if (e.key === "Enter") {
      console.log(editedLabel);
      props.editLabelHandler(label, editedLabel);
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [addLabel]);

  return (
    <Dialog open={props.open}>
      <DialogTitle id="simple-dialog-title">Edit Labels</DialogTitle>
      <div style={{ display: "flex", padding: "5px 24px" }}>
        {!addLabel && (
          <div style={{ display: "flex" }}>
            <CloseIcon onClick={onCloseIconClick}></CloseIcon>
            <input
              type="text"
              ref={inputRef}
              value={labelValue}
              onKeyPress={onKeyChange}
              onChange={addNewLabel}
              placeholder="Create new Label"
            />

            <CheckIcon onClick={onCheckIconClick}></CheckIcon>
          </div>
        )}
        {addLabel && (
          <div style={{ display: "flex" }} onClick={changeAddLabeleLayout}>
            <AddIcon style={{ marginRight: "15px" }}></AddIcon>
            <h4 style={{ margin: "0" }}>Create new label</h4>
          </div>
        )}
      </div>
      {props.labelList.length && props.labelList.map(label => (
        <li
          onMouseOver={() => mouseHoverHandler(label)}
          onMouseLeave={() => mouseLeaveHandler(label)}
          key={label.index}
          style={{ listStyleType: "none", padding: "5px 24px" }}
        >
          <div>
            {!label.isHovered && <LabelIcon className="sidebar-icon" />}
            {label.isHovered && <DeleteIcon></DeleteIcon>}

            {!label.isEditable && <span>{label.title}</span>}
            {label.isEditable && (
              <input
                defaultValue={`${label.title}`}
                onChange={e => labelChangeHandler(e, label)}
                onKeyPress={e => updateLabelHandler(label, e)}
              />
            )}

            {!label.isEditable && (
              <EditIcon
                onClick={() => changeLabelIconHandler(label, "edit")}
              ></EditIcon>
            )}
            {label.isEditable && (
              <CheckIcon
                onClick={() => changeLabelIconHandler(label, "save")}
              ></CheckIcon>
            )}
          </div>
          {/* <div style={{ display: "flex" }}>
            {!label.isEditable && (
              <ViewLabelDialog key={`display-${label.index}`} label={label} />
            )}
            {label.isEditable && (
              <EditLabelDialog1 key={`edit-${label.index}`} label={label} />
            )}
          </div> */}
        </li>
      ))}
      <button onClick={props.closeDialog}>Done</button>
    </Dialog>
  );
}

// function ViewLabelDialog({ label }) {
//   function updateExistingLabel(label) {
//     console.log(label);
//   }

//   return (
//     <div
//       onMouseOver={() => mouseHoverHandler(label)}
//       onMouseOver={() => mouseLeaveHandler(label)}
//     >
//       {!label.isHovered && <LabelIcon className="sidebar-icon" />}
//       {label.isHovered && <DeleteIcon></DeleteIcon>}
//       <span>{label.title}</span>

//       <EditIcon onClick={() => updateExistingLabel(label)}></EditIcon>
//     </div>
//   );
// }

// function EditLabelDialog1({ label }) {
//   function updateExistingLabel() {}
//   return (
//     <div>
//       <input value={label.title} />
//       <button
//         style={{
//           border: "none",
//           backgroundColor: "transparent",
//           margin: "0 5px",
//           outline: "none"
//         }}
//         onClick={() => updateExistingLabel("save", label)}
//       >
//         <CheckIcon></CheckIcon>
//       </button>
//     </div>
//   );
// }
