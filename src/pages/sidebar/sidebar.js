import React, { useState } from "react";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import "./sidebar.scss";
import EditLabelDialog from "../../component/Dialogs/editLabelDialog";

let labelArrayList = [
  {
    title: "Label 1",
    index: 1,
    isHovered: false,
    isEditable: false
  },
  {
    title: "Label 2",
    index: 2,
    isHovered: false,
    isEditable: false
  },
  {
    title: "Label 3",
    index: 3,
    isHovered: false,
    isEditable: false
  },
  {
    title: "Label 4",
    index: 4,
    isHovered: false,
    isEditable: false
  },
  {
    title: "Label 5",
    index: 5,
    isHovered: false,
    isEditable: false
  }
];

function Sidebar(props) {
  const [nodeId, setNodeId] = useState([]);
  const [open, setOpen] = useState(false);
  const [labelArray, setLAbelArray] = useState(labelArrayList);
  function editLables() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function onTitleChange(title) {
    setNodeId([...nodeId, title]);
    nodeId.map(id => {
      document.getElementById(id).style.background = "transparent";
      document.getElementById(id).style.borderRadius = "";
    });
    props.onTitleChange(title);
    document.getElementById(title).style.background = "#feefc3";
    document.getElementById(title).style.borderRadius = "0 25px 25px 0";
  }

  function newLabelHandler(label) {
    setLAbelArray([...labelArray, label]);
  }

  function editLabelHandler(label, type) {
    if (type === "hover") {
      const modifiedLabelArray = labelArray.map(item => {
        if (label.title === item.title) {
          item.isHovered = true;
        }
        return item;
      });
      setLAbelArray(modifiedLabelArray);
    } else if (type === "leave") {
      const modifiedLabelArray = labelArray.map(item => {
        if (label.title === item.title) {
          item.isHovered = false;
        }
        return item;
      });
      setLAbelArray(modifiedLabelArray);
    } else if (type === "edit") {
      const modifiedLabelArray = labelArray.map(item => {
        if (label.title === item.title) {
          item.isEditable = !item.isEditable;
        }
        return item;
      });
      setLAbelArray(modifiedLabelArray);
    } else if (type === "save") {
      const modifiedLabelArray = labelArray.map(item => {
        if (label.title === item.title) {
          item.isEditable = !item.isEditable;
        }
        return item;
      });
      setLAbelArray(modifiedLabelArray);
    } else {
      const modifiedLabelArray = labelArray.map(item => {
        if (label.index === item.index) {
          item.title = type;
          item.isEditable = !label.isEditable;
        }
        return item;
      });
      setLAbelArray(modifiedLabelArray);
    }
  }

  return (
    <>
      {props.toggle && (
        <div className={`keep-sidebar`} style={{ width: "280px" }}>
          <ul className="divider">
            <li id="Keep" onClick={e => onTitleChange("Keep")}>
              <div>
                <EmojiObjectsIcon className="sidebar-icon" />
                {<span>Notes</span>}
              </div>
            </li>
            <li id="Reminder" onClick={e => onTitleChange("Reminder")}>
              <div>
                <NotificationsIcon className="sidebar-icon" />
                <span>Reminder</span>
              </div>
            </li>
          </ul>

          <ul className="divider">
            <div className="label">LABELS</div>
            {labelArray.map(label => (
              <li
                id={label.title}
                key={label.index}
                onClick={e => onTitleChange(label.title)}
              >
                <div>
                  <LabelIcon className="sidebar-icon" />
                  <span>{label.title}</span>
                </div>
              </li>
            ))}
            <li onClick={editLables}>
              <div>
                <EditIcon className="sidebar-icon" />
                <span>Edit</span>
              </div>
            </li>
          </ul>
          <ul className="divider">
            <li id="Archive" onClick={e => onTitleChange("Archive")}>
              <div>
                <ArchiveIcon className="sidebar-icon" />
                <span>Archive</span>
              </div>
            </li>
            <li id="Delete" onClick={e => onTitleChange("Delete")}>
              <div>
                <DeleteIcon className="sidebar-icon" />
                <span>Delete</span>
              </div>
            </li>
          </ul>
        </div>
      )}

      <EditLabelDialog
        open={open}
        closeDialog={closeDialog}
        labelList={labelArray}
        newLabelHandler={newLabelHandler}
        editLabelHandler={editLabelHandler}
      />
    </>
  );
}

export default Sidebar;
