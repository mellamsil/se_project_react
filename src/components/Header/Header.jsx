import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Header.css";
import logo from "../../assets/logo.svg";
import defaultAvatar from "../../assets/avatar.svg";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
  isLoggedIn,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
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
                  <img
                    src={defaultAvatar}
                    alt="Default avatar"
                    className="header__avatar"
                  />
                )}
              </div>
            </Link>
          </>
        ) : (
          <nav className="header__auth-links">
            <button
              className="header__link header__link_signup"
              onClick={handleRegisterClick}
              // aria-label="Open sign-up modal"
            >
              Sign Up
            </button>
            <button
              className="header__link header__link_signin"
              onClick={handleLoginClick}
              // aria-label="Open sign-in modal"
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
