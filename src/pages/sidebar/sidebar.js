import React, { useState } from "react";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import EditLabelDialog from "../../component/Dialogs/editLabelDialog";

const sideNavObject = [
  {
    icon: <EmojiObjectsIcon />,
    title: "Notes",
    section: "top",
    dynamic: false,
    isEditable: false
  },
  {
    icon: <NotificationsIcon />,
    title: "Reminder",
    section: "top",
    dynamic: false,
    isEditable: false
  }
];

let labelArrayList = [
  {
    title: "Label 1",
    index: 1
  },
  {
    title: "Label 2",
    index: 2
  },
  {
    title: "Label 3",
    index: 3
  },
  {
    title: "Label 4",
    index: 4
  },
  {
    title: "Label 5",
    index: 5
  }
];

function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const [labelArray, setLAbelArray] = useState(labelArrayList)
  function editLables() {
    setOpen(true);
    console.log("inside editable");
  }

  function closeDialog() {
    setOpen(false);
  }

  function onLabelChange(label) {
    setLAbelArray([...labelArray, label]) ;
    console.log(labelArray)
  }
  return (
    <>
      {props.toggle && (
        <div className="keep-sidebar" style={{ width: "280px" }}>
          <ul className="divider">
            <li onClick={() => props.onTitleChange("Keep")}>
              <NavLink to="/home" activeClassName="active-route">
                <div>
                  <EmojiObjectsIcon className="sidebar-icon" />
                  {<span>Notes</span>}
                </div>
              </NavLink>
            </li>
            <li onClick={() => props.onTitleChange("Reminder")}>
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
                key={label.index}
                onClick={() => props.onTitleChange(label.title)}
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
            <li onClick={() => props.onTitleChange("Archive")}>
              <div>
                <ArchiveIcon className="sidebar-icon" />
                <span>Archive</span>
              </div>
            </li>
            <li onClick={() => props.onTitleChange("Delete")}>
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
        onLabelChange={onLabelChange}
      />
    </>
  );
}

export default Sidebar;
