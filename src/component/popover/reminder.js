import React, { useState, useEffect, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import PlaceIcon from "@material-ui/icons/Place";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const reminderDateTime = [
  {
    date: "Later Today",
    time: "8:00 PM"
  },
  {
    date: "Tomorrow",
    time: "8:00 PM"
  },
  {
    date: "Next Week",
    time: " Mon, 8:00 PM"
  }
];

export default function ReminderPopup(props) {
  const [location, setLocation] = useState(false);
  const locationRef = useRef();
  function handlePlaceClick() {
    setLocation(!location);
  }

  function onClose() {
    props.handleClose();
    setTimeout(() => {
      setLocation(false);
    }, 1000);
  }

  function handleBack() {
    setLocation(false);
  }

  function reminderCustomHandler() {
    props.handleClose(locationRef.current.value);
  }

  function reminderHandler(item) {
    props.handleClose(item);
  }

  useEffect(() => {}, [location]);

  return (
    <Popover
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
      {!location && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            width: "300px"
          }}
        >
          <h3 style={{ margin: 0 }}>Reminder</h3>
          {reminderDateTime.map((item, i) => (
            <div
              key={i}
              onClick={reminderHandler}
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <p>{item.date}</p>
              <p>{item.time}</p>
            </div>
          ))}

          <div
            style={{
              display: "flex"
            }}
          >
            <AccessTimeIcon
              style={{
                margin: "12px 10px 0 0"
              }}
            ></AccessTimeIcon>{" "}
            <p>Place date and time</p>
          </div>
          <div
            onClick={handlePlaceClick}
            style={{
              display: "flex"
            }}
          >
            <PlaceIcon
              style={{
                margin: "12px 10px 0 0"
              }}
            ></PlaceIcon>{" "}
            <p>Pick Place</p>
          </div>
        </div>
      )}
      {location && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            padding: "15px"
          }}
        >
          <div style={{ display: "flex" }}>
            <KeyboardBackspaceIcon
              style={{
                marginRight: "12px"
              }}
              onClick={handleBack}
            ></KeyboardBackspaceIcon>
            <h3 style={{ margin: 0 }}>Pick time</h3>
          </div>
          <input
            ref={locationRef}
            style={{
              borderLeft: 0,
              borderRight: 0,
              borderTop: 0,
              borderBottom: "1px solid",
              outline: "none",
              margin: "12px 0"
            }}
            type="text"
            defaultValue="govandi east"
          />
          <button
            style={{
              width: "50px",
              border: "none",
              background: "no-repeat",
              fontWeight: "bold",
              color: "grey",
              fontSize: "15px",
              marginLeft: "250px"
            }}
            onClick={reminderCustomHandler}
          >
            Save
          </button>
        </div>
      )}
    </Popover>
  );
}
