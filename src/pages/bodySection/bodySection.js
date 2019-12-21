import React, { useState, useRef, useEffect, Suspense, Fragment } from "react";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ImageIcon from "@material-ui/icons/Image";
import ArchiveIcon from "@material-ui/icons/Archive";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ColorizeOutlinedIcon from "@material-ui/icons/ColorizeOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import "./bodySection.scss";
import Masonry from "react-masonry-component";
import fetchData from "../../pages/fakeApi";
import ReminderPopup from "../../component/popover/reminder";
// import ColorPopup from "../../component/popover/color";
import { Popover } from "@material-ui/core";

const getStyle = toggle => {
  if (toggle) {
    return {
      marginLeft: "280px"
    };
  } else {
    return {
      marginLeft: "0"
    };
  }
};

const viewTypes = {
  l: "list",
  t: "text"
};

const resource = fetchData();

function BodySection(props) {
  const [listName, setListName] = useState("");
  const [listItems, setListItems] = useState([]);
  const [reminderEl, setReminderEl] = useState(null);
  const [colorEl, setColorEl] = useState(null);
  const [completedItem, setCompletedItem] = useState([]);
  const noteRef = useRef();
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [pinNote, setPinNote] = useState("");
  const [remindMe, setRemindMe] = useState("");
  const [collaberator, setCollabarator] = useState([]);
  const [color, setColor] = useState("");
  const [archive, setArchive] = useState(false);
  const [view, setView] = useState(viewTypes["t"]);
  const [toggleInput, setToggleInput] = useState(false);

  function titleHandler(e) {
    setTitle(e.target.value);
  }

  function expandInputHandler() {
    setIsInputExpanded(true);
    setView(viewTypes["t"]);
  }

  function noteHandler(e) {
    setNote(e.target.value);
  }

  function submitHandler() {
    setIsInputExpanded(false);
    setTitle("");
    setNote("");
  }

  function titleKeyPressHandler() {
    setIsInputExpanded(true);
  }

  function changeViewHandler() {
    setIsInputExpanded(true);
    setView(viewTypes["l"]);
  }

  function listItemHandler(e) {
    setListName(e.target.value);
  }

  function listItemSubmit(e) {
    if (e.key === "Enter") {
      const listObj = {
        title: listName,
        isHovered: false,
        isCompleted: false,
        index: listItems.length + 1 || 1
      };
      const newItemList = [...listItems, listObj];
      setListItems(newItemList);
      setListName("");
    }
  }

  function onItemHover(label) {
    const modifiedList = listItems.map(item => {
      if (item.title === label.title) {
        label.isHovered = true;
      }
      return item;
    });

    setListItems(modifiedList);
  }

  function onItemLeave(label) {
    const modifiedList = listItems.map(item => {
      if (item.title === label.title) {
        label.isHovered = false;
      }
      return item;
    });
    setListItems(modifiedList);
  }

  function checkBoxClicked(item) {
    item.isCompleted = true;
    setCompletedItem([...completedItem, item]);

    const val = listItems.filter(
      task => task.isCompleted === !item.isCompleted
    );
    console.log(val);
    setListItems(val);
  }

  function checkboxClickHandler(item) {
    item.isCompleted = false;
    const val = completedItem.filter(
      task => task.isCompleted === !item.isCompleted
    );
    setCompletedItem(val);

    setListItems([...listItems, item]);
  }

  function onCompletedItemHover(label) {
    const modifiedList = completedItem.map(item => {
      if (item.title === label.title) {
        label.isHovered = true;
      }
      return item;
    });
    setCompletedItem(modifiedList);
  }

  function onCompletedItemLeave(label) {
    const modifiedList = completedItem.map(item => {
      if (item.title === label.title) {
        label.isHovered = false;
      }
      return item;
    });
    setCompletedItem(modifiedList);
  }

  function textNoteHandler(e) {
    console.log(e.target.value);
  }

  const handleReminderClick = event => {
    setReminderEl(event.currentTarget);
  };

  const handleColorClick = event => {
    setColorEl(event.currentTarget);
  };

  const handleColorClose = val => {
    setColor(val);
    setColorEl(null);
  };

  const handleReminderClose = val => {
    setRemindMe(val);
    setReminderEl(null);
  };

  const reminderPopover = Boolean(reminderEl);
  const colorPopOver = Boolean(colorEl);

  useEffect(() => {
    if (noteRef.current) {
      document.getElementById("note").focus();
    }
  }, [isInputExpanded]);

  return (
    <div style={getStyle(props.toggle)}>
      <div className="add-new-note">
        <div className="add-new-note-section">
          <input
            style={{ width: "80%" }}
            className="add-new-note-section-input"
            value={title}
            onKeyPress={titleKeyPressHandler}
            onChange={titleHandler}
            placeholder="Title"
            onClick={expandInputHandler}
            type="text"
          />
          {isInputExpanded ? (
            <ColorizeOutlinedIcon></ColorizeOutlinedIcon>
          ) : (
            <div>
              <CheckBoxIcon
                style={{ width: "46px" }}
                onClick={changeViewHandler}
              ></CheckBoxIcon>
              <ImageIcon style={{ width: "46px" }}></ImageIcon>
            </div>
          )}
        </div>
        {isInputExpanded && (
          <div className="add-new-note-list">
            {view === "text" && (
              // <div className="add-new-note-section">
              //   <textarea style={{width: '100%', resize: 'none', overflow: 'hidden'}}
              //     className="add-new-note-section-input"
              //     id="note"
              //     ref={noteRef}
              //     value={note}
              //     onChange={noteHandler}
              //     placeholder="Take a note..."
              //   />
              // </div>
              <div
                contentEditable="true"
                ref={noteRef}
                onChange={textNoteHandler}
                id="note"
                style={{
                  dispaly: "inline-block",
                  direction: "ltr",
                  padding: "12px 15px",
                  outline: "none",
                  textAlign: "left",
                  minHeight: "22px"
                }}
              ></div>
            )}
            {view === "list" && (
              <div className="add-new-note-list-name">
                {listItems.length > 0 &&
                  listItems.map(item => (
                    <div
                      onMouseOver={() => onItemHover(item)}
                      onMouseLeave={() => onItemLeave(item)}
                      key={item.index}
                      style={{ display: "flex", padding: "7px 15px" }}
                    >
                      <input
                        onClick={() => checkBoxClicked(item)}
                        type="checkbox"
                        style={{ marginRight: "15px" }}
                      />
                      <p style={{ margin: 0, flexGrow: 1, textAlign: "left" }}>
                        {item.title}
                      </p>
                      {item.isHovered && !item.isCompleted && (
                        <ClearOutlinedIcon
                          style={{ fontSize: "24px" }}
                        ></ClearOutlinedIcon>
                      )}
                    </div>
                  ))}
                <div className="add-note-list">
                  <AddOutlinedIcon
                    style={{ marginRight: "15px" }}
                  ></AddOutlinedIcon>
                  <input
                    style={{ border: "none", outline: "none", width: "80%" }}
                    placeholder="List item"
                    type="text"
                    value={listName}
                    onChange={listItemHandler}
                    onKeyPress={listItemSubmit}
                  />
                </div>
                {completedItem.length > 0 && (
                  <div>
                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    {completedItem.length} items Completed
                  </div>
                )}
                {completedItem.length > 0 &&
                  completedItem.map(item => (
                    <div
                      onMouseOver={() => onCompletedItemHover(item)}
                      onMouseLeave={() => onCompletedItemLeave(item)}
                      key={item.index}
                      style={{ display: "flex", padding: "7px 15px" }}
                    >
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => checkboxClickHandler(item)}
                        style={{ marginRight: "15px" }}
                      />
                      <p style={{ margin: 0, flexGrow: 1, textAlign: "left" }}>
                        {item.title}
                      </p>
                      {item.isHovered && item.isCompleted && (
                        <ClearOutlinedIcon
                          style={{ fontSize: "24px" }}
                        ></ClearOutlinedIcon>
                      )}
                    </div>
                  ))}
              </div>
            )}
            <div className="add-new-note-section">
              <AddAlertIcon
                title="Remind me"
                variant="contained"
                color="primary"
                onClick={handleReminderClick}
              ></AddAlertIcon>
              <ReminderPopup
                open={reminderPopover}
                anchorEl={reminderEl}
                handleClose={handleReminderClose}
              />
              <PersonAddIcon></PersonAddIcon>
              <ColorLensIcon title="Change color" onClick={handleColorClick}>
                <ColorPopup 
                 open1 = {colorPopOver}
                 anchorEl1 = {colorEl}></ColorPopup>
              </ColorLensIcon>
              <ImageIcon title="add image"></ImageIcon>
              <ArchiveIcon title="archive"></ArchiveIcon>
              <MoreVertIcon></MoreVertIcon>
              <button onClick={submitHandler}> Close</button>
            </div>
          </div>
        )}
      </div>
      <Suspense fallback={<h1>Loading Notes...</h1>}>
        <UserNotes title={props.title} notes={props.notes} />
      </Suspense>
    </div>
  );
}

function UserNotes({ title, notes }) {
  useEffect(() => {
    console.log(notes);
  }, [title]);

  return (
    <>
      {notes.length > 0 ? (
        <Fragment>
          {title === "Keep" ? (
            <div>
              <div
                style={{
                  width: "785px",
                  margin: "auto"
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    marginLeft: "15px"
                  }}
                >
                  Pinned
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "785px",
                    margin: "auto"
                  }}
                >
                  {notes.map(note =>
                    note.isPined ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          flexDirection: "column",
                          width: "245px",
                          border: "1px solid #ebebeb",
                          borderRadius: "15px",
                          margin: "15px"
                        }}
                      >
                        <div style={{ padding: "12px 17px 0 18px" }}>
                          <p
                            style={{
                              margin: 0,
                              wordBreak: "break-all",
                              textAlign: "left"
                            }}
                          >
                            {note.title}
                          </p>
                          <p
                            style={{
                              textAlign: "left",
                              margin: 0,
                              wordBreak: "break-all",
                              paddingTop: "12px"
                            }}
                          >
                            {note.description}
                          </p>
                        </div>

                        <div
                          style={{
                            padding: "10px 12px",
                            display: "flex",
                            outline: "none",
                            height: "22px",
                            width: "225px",
                            justifyContent: "space-between"
                          }}
                        >
                          <AddAlertIcon title="Remind me"></AddAlertIcon>
                          <PersonAddIcon title="collaberator"></PersonAddIcon>
                          <ColorLensIcon title="Change color"></ColorLensIcon>
                          <ImageIcon title="add image"></ImageIcon>
                          <ArchiveIcon title="archive"></ArchiveIcon>
                          <MoreVertIcon></MoreVertIcon>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "785px",
                  margin: "auto"
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    marginLeft: "15px"
                  }}
                >
                  Others
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "785px",
                    margin: "auto"
                  }}
                >
                  {notes.map(note =>
                    !note.isPined ? (
                      <Masonry
                        style={{
                          width: "245px",

                          backgroundColor: `${note.color}`,
                          border: "1px solid #ebebeb",
                          borderRadius: "15px",
                          margin: "15px"
                        }}
                      >
                        <div style={{ padding: "12px 17px 0 18px" }}>
                          <p
                            style={{
                              margin: 0,
                              wordBreak: "break-all",
                              textAlign: "left"
                            }}
                          >
                            {note.title}
                          </p>
                          <p
                            style={{
                              textAlign: "left",
                              margin: 0,
                              wordBreak: "break-all",
                              paddingTop: "12px"
                            }}
                          >
                            {note.description}
                          </p>
                        </div>

                        <div
                          style={{
                            padding: "10px 12px",
                            display: "flex",
                            outline: "none",
                            height: "22px",
                            width: "225px",
                            justifyContent: "space-between"
                          }}
                        >
                          <AddAlertIcon title="Remind me"></AddAlertIcon>
                          <PersonAddIcon title="collaberator"></PersonAddIcon>
                          <ColorLensIcon title="Change color"></ColorLensIcon>
                          <ImageIcon title="add image"></ImageIcon>
                          <ArchiveIcon title="archive"></ArchiveIcon>
                          <MoreVertIcon></MoreVertIcon>
                        </div>
                      </Masonry>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "785px",
                margin: "auto"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "785px",
                  margin: "auto"
                }}
              >
                {notes.map(note => (
                  <Masonry
                    style={{
                      width: "245px",

                      backgroundColor: `${note.color}`,
                      border: "1px solid #ebebeb",
                      borderRadius: "15px",
                      margin: "15px"
                    }}
                  >
                    <div style={{ padding: "12px 17px 0 18px" }}>
                      <p
                        style={{
                          margin: 0,
                          wordBreak: "break-all",
                          textAlign: "left"
                        }}
                      >
                        {note.title}
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          margin: 0,
                          wordBreak: "break-all",
                          paddingTop: "12px"
                        }}
                      >
                        {note.description}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "10px 12px",
                        display: "flex",
                        outline: "none",
                        height: "22px",
                        width: "225px",
                        justifyContent: "space-between"
                      }}
                    >
                      <AddAlertIcon title="Remind me"></AddAlertIcon>
                      <PersonAddIcon title="collaberator"></PersonAddIcon>
                      <ColorLensIcon title="Change color"></ColorLensIcon>
                      <ImageIcon title="add image"></ImageIcon>
                      <ArchiveIcon title="archive"></ArchiveIcon>
                      <MoreVertIcon></MoreVertIcon>
                    </div>
                  </Masonry>
                ))}
              </div>
            </div>
          )}


        </Fragment>
      ) : (
        <Fragment>
          <h1>No notes fpund</h1>
        </Fragment>
      )}

    </>
  );
}

export default BodySection;


function ColorPopup(props) {
  const [color, setColor] = useState("");

  function onClose() {
    console.log("ssss");
  }

  useEffect(() => {
    console.log(props, "ssssssssssssssssss------> ");
  });

  return (
    // <Popover
    //   id="color"
    //   open={props.open1}
    //   anchorEl={props.colorEl1}
    //   onClose={onClose}
    //   anchorOrigin={{
    //     vertical: "bottom",
    //     horizontal: "center"
    //   }}
    //   transformOrigin={{
    //     vertical: "top",
    //     horizontal: "center"
    //   }}
    // >
      <h1>hello color</h1>
    // </Popover>
  );
}