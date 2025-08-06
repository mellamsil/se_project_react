import React from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

const SideBar = ({
  currentUser,
  onSignOut,
  handleCloseModal,
  handleEditProfileClick,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          src={currentUser.avatar}
          className="sidebar__avatar"
          alt="avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__profile-edit-button"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__logout" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
};

export default SideBar;
