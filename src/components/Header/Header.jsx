import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Header.css";
import logo from "../../assets/logo.svg";
import defaultAvatar from "../../assets/avatar.svg";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
  isLoggedIn,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  console.log(isLoggedIn);
  console.log(currentUser);
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__nav">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__add-clothes-button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name || "User"}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || "User avatar"}
                    className="header__avatar"
                  />
                ) : (
                  <span className="span">
                    {currentUser.name?.toUpperCase().charAt(0) || ""}
                  </span>
                )}
              </div>
            </Link>
          </>
        ) : (
          <nav className="header__auth-links">
            <button
              className="header__link header__link_signup"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__link header__link_signin"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
