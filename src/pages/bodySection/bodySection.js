import React, { useState, useRef, useEffect } from "react";
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

function BodySection(props) {
  const [listName, setListName] = useState("");
  const [listItems, setListItems] = useState([]);
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
    const modifiedList = listItems.map((item) => {
      if(item.title === label.title) {
        label.isHovered = true
      }
      return item
    })
   
    setListItems(modifiedList)
  }

  function onItemLeave(label) {
    const modifiedList = listItems.map((item) => {
      if(item.title === label.title) {
        label.isHovered = false
      }
      return item
    })
    setListItems(modifiedList)
  }

  function checkBoxClicked(item) {
    item.isCompleted = true;
    setCompletedItem([...completedItem, item]);

    const val = listItems.filter(task => task.isCompleted === !item.isCompleted);
    console.log(val)
    setListItems(val);
  }

  function checkboxClickHandler(item) {
    item.isCompleted = false;
    const val = completedItem.filter(task => task.isCompleted === !item.isCompleted);
    setCompletedItem(val)

    setListItems([...listItems, item])
  }

  function onCompletedItemHover(label) {
    const modifiedList = completedItem.map((item) => {
      if(item.title === label.title) {
        label.isHovered = true
      }
      return item
    })
    setCompletedItem(modifiedList)
  }

  function onCompletedItemLeave(label) {
    const modifiedList = completedItem.map((item) => {
      if(item.title === label.title) {
        label.isHovered = false
      }
      return item
    })
    setCompletedItem(modifiedList)
  }

  function textNoteHandler(e) {
    console.log(e.target.value)
  }

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
                      <p style={{ margin: 0, flexGrow: 1, textAlign:'left' }}>{item.title}</p>
                      {item.isHovered && !item.isCompleted && (
                        <ClearOutlinedIcon style={{fontSize: '24px'}}></ClearOutlinedIcon>
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
                      <p style={{ margin: 0, flexGrow: 1, textAlign: 'left' }}>{item.title}</p>
                      {item.isHovered && item.isCompleted && (
                        <ClearOutlinedIcon  style={{fontSize: '24px'}}></ClearOutlinedIcon>
                      )}
                    </div>
                  ))}
              </div>
            )}
            <div className="add-new-note-section">
              <AddAlertIcon title='Remind me'  ></AddAlertIcon>
              <PersonAddIcon title='collaberator'></PersonAddIcon>
              <ColorLensIcon title='Change color'></ColorLensIcon>
              <ImageIcon title='add image'></ImageIcon>
              <ArchiveIcon title='archive'></ArchiveIcon>
              <MoreVertIcon></MoreVertIcon>
              <button onClick={submitHandler}> Close</button>
            </div>
          </div>
        )}
      </div>
      <div>
                        
      </div>
    </div>
  );
}

const data = [
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  },
  {
    title: "Dhaval",
    description: "asdfjljflk",
    isPined: false,
    isArchived: false,
    isDeleted: true,
    reminder: [],
    createdDate: "2019-07-06T09:28:52.404Z",
    modifiedDate: "2019-07-06T09:28:52.404Z",
    color: "#3FEEE6",
    label: [],
    imageUrl: "",
    linkUrl: "",
    collaborators: [],
    id: "5d2069d4042ffb004053e6fa",
    userId: "5d10734bd0c1c70040b4b6d7",
    collaberator: [],
    noteCheckLists: [],
    noteLabels: [],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Krushna",
      lastName: "Nikam",
      imageUrl: "images/1566972270319.jpg",
      role: "user",
      service: "advance",
      createdDate: "2019-06-24T06:52:59.502Z",
      modifiedDate: "2019-06-24T06:52:59.502Z",
      addresses: [
        {
          address: "Aurangabad"
        }
      ],
      username: "Krushnanikam26@gmail.com",
      email: "Krushnanikam26@gmail.com",
      emailVerified: true,
      id: "5d10734bd0c1c70040b4b6d7"
    }
  }
];

export default BodySection;
