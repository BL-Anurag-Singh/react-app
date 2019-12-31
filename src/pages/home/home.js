import React, { useState, Suspense, lazy, useEffect } from "react";
import getNotes from "../fakeApi";
// import Header from "../../component/header/header";
// import Sidebar from "../sidebar/sidebar";
// import BodySection from "../bodySection/bodySection";

const viewList = {
  l: "list",
  g: "grid"
};

const Header = lazy(() => import("../../component/header/header"));
const Sidebar = lazy(() => import("../sidebar/sidebar"));
const BodySection = lazy(() => import("../bodySection/bodySection"));

function Home() {
  const fetechedNotes = getNotes();
  const [notes, setNotes] = useState(fetechedNotes);
  const [filter, setFilter] = useState("");
  const [toogle, setToogle] = useState(false);
  const [viewType, setViewType] = useState(viewList["l"]);
  const [title, setTitle] = useState("Keep");
  function onTitleChange(name) {
    setTitle(name);
  }

  function onSearchValueChange(e) {
    setFilter(e.target.value);
    console.log(filter)
  }

  function onViewTypeChange(type) {
    type === "list" ? setViewType("grid") : setViewType("list");
  }

  function onMenuIconClick() {
    setToogle(!toogle);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (title) {
        switch (title) {
          case "Keep": {
            const fetechedNotes = getNotes();
            setNotes(fetechedNotes);
            break;
          }
          case "Reminder": {
            const fetechedNotes = getNotes();
            const modifiedNotes = fetechedNotes.filter(note => {
              return note.reminder.length > 0;
            });
            setNotes(modifiedNotes);
            break;
          }
          case "Archive": {
            const fetechedNotes = getNotes();
            const modifiedNotes = fetechedNotes.filter(note => {
              return note.isArchived;
            });
            setNotes(modifiedNotes);
            break;
          }
          case "Delete": {
            const fetechedNotes = getNotes();
            const modifiedNotes = fetechedNotes.filter(note => {
              return note.isDeleted;
            });
            setNotes(modifiedNotes);
            break;
          }
          default: {
            const fetechedNotes = getNotes();
            const modifiedNotes = [];
            fetechedNotes.forEach((note, index, notes) => {
              if (note.label.length > 0) {
                note.label.forEach(n => {
                  if (n.label === title) {
                    modifiedNotes.push(note);
                  }
                });
              }
            });
            setNotes(modifiedNotes);
            break;
          }
        }
      }
    };
    fetchData();
  }, [title]);

  return (
    <>
      <Suspense fallback="loading components please wait....">
        <div>
          <Header
            title={title}
            onMenuIconClick={onMenuIconClick}
            onSearchValueChange={onSearchValueChange}
            viewType={viewType}
            onViewTypeChange={onViewTypeChange}
          ></Header>

          <Sidebar toggle={toogle} onTitleChange={onTitleChange}></Sidebar>
          <BodySection toggle={toogle} title={title} notes={notes} viewType={viewType}>
            {" "}
          </BodySection>
        </div>
      </Suspense>
    </>
  );
}

export default Home;
