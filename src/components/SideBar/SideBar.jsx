import React from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">Melvin Sillah</p>
      </div>
    </div>
  );
}

export default SideBar;
