import React, { useState } from "react";
import Header from "../../component/header/header";
import Sidebar from "../sidebar/sidebar";
import BodySection from "../bodySection/bodySection";

const viewList = {
  l: "list",
  g: "grid"
};

function Home() {
  const [filter, setFilter] = useState("");
  const [toogle, setToogle] = useState(false);
  const [viewType, setViewType] = useState(viewList["l"]);
  const [title, setTitle] = useState("Keep");

  function onTitleChange(name) {
    console.log(name)
    setTitle(name);
  }

  function onSearchValueChange(e) {
    setFilter(e.target.value);
  }

  function onViewTypeChange(type) {
    console.log(type)
    type === 'list' ? setViewType('grid') : setViewType('list')
    ;
  }

  function onMenuIconClick() {
    console.log(toogle)
    setToogle(!toogle);
  }

  return (
    <div>
      <Header
        title={title}
        onMenuIconClick={onMenuIconClick}
        onSearchValueChange={onSearchValueChange}
        viewType={viewType}
        onViewTypeChange={onViewTypeChange}
      ></Header>

      <Sidebar toggle={toogle} onTitleChange={onTitleChange}></Sidebar>
      <BodySection toggle={toogle}> </BodySection>
    </div>
  );
}

export default Home;
