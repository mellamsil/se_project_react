// import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  //const username = "Terrence Tegegne";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}{" "}
        </p>
      </div>

      <div className="header__nav">
        <ToggleSwitch />
        <button onClick={handleAddClick} className="header__add-clothes-button">
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          {/* <div className="header__profile">
          <div className="header__user-name">{username}</div>
          {avatar ? (
            <img
              className="header__avatar"
              src={avatar || avatarDefault}
              alt="user avatar"
            />
          ) : (
            <span className="header__avatar header__avatar_name">
              {username?.toUpperCase().charAt(0) || ""}
            </span>
          )}
        </div> */}

          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
