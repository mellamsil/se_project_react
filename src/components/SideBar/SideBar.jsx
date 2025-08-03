import React from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
    </div>
  );
}

export default SideBar;
