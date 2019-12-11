import React from "react";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";

const sideNavObject = [
    {
        icon: <EmojiObjectsIcon/>,
        title: 'Notes',
        section: 'top',
        dynamic: false,
        isEditable: false
    },
    {
        icon: <NotificationsIcon/>,
        title: 'Reminder',
        section: 'top',
        dynamic: false,
        isEditable: false 
    },
]

function Sidebar(props) {
  return (
    <>
      {props.toggle && (
        <div className="keep-sidebar" style={{ width: "280px" }}>
          <ul className="divider">
            <li onClick={() => props.onTitleChange('Keep')}>
              <NavLink to='/home' activeClassName='active-route'>
                <div>
                  <EmojiObjectsIcon className="sidebar-icon" /> 
                  {<span>Notes</span>}
                </div>
              </NavLink>
            </li>   
            <li onClick={() => props.onTitleChange('Reminder')}>
              <div>
                <NotificationsIcon className="sidebar-icon" />
                <span>Reminder</span>
              </div>
            </li>
          </ul>

          <ul className="divider">
            <div className="label">LABELS</div>
            <li onClick={() => props.onTitleChange('Notes1')}>
              <div>
                <LabelIcon className="sidebar-icon" />
                <span>Notes1</span>
              </div>
            </li>
            <li onClick={() => props.onTitleChange('Reminder')}>
              <div>
                <EditIcon className="sidebar-icon" />
                <span>Edit</span>
              </div>
            </li>
          </ul>
          <ul className="divider">
            <li onClick={() => props.onTitleChange('Archive')}>
              <div>
                <ArchiveIcon className="sidebar-icon" />
                <span>Archive</span>
              </div>
            </li>
            <li onClick={() => props.onTitleChange('Delete')}>
              <div>
                <DeleteIcon className="sidebar-icon" />
                <span>Delete</span>
              </div >
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
