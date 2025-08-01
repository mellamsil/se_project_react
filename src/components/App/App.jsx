import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import {
  coordinates,
  APIkey,
  defaulClothingItems,
} from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

import * as api from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  register,
  login,
  validateToken,
  updateUserProfile,
  checkToken,
} from "../../utils/auth.js";
import LoginModal from "../LoginModal/LoginModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaulClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return api
      .addItem({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Register user, then log in via authorize()
  const handleRegister = (formData, onError) => {
    register(formData)
      .then(() => handleLogin(formData.email, formData.password))
      // .then((data) => {
      //   if (data.token) {
      //     localStorage.setItem("jwt", data.token);
      //     setIsLoggedIn(true);
      //     onSuccess();
      //     closeActiveModal();
      //   }
      // })
      .catch((err) => {
        console.error("Registration error:", err.message);
        onError(err);
      });
  };

  const handleLogin = (email, password) => {
    login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return checkToken(data.token);
        }
        throw new Error("Login failed: no token");
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login error:", err.message);
      });
  };

  const onLogin = ({ email, password }) => {
    return fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/signin");
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.includes(currentUser._id);

    const likeAction = isLiked
      ? api.removeCardLike(_id, token)
      : api.addCardLike(_id, token);

    likeAction
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.log("Like/Dislike error:", err));
  };

  const onDeleteItem = () => {
    api
      .handleDeleteCard(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((card) => card._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error(`Unable to delete clothing item due to: ${err}`);
      });
  };

  const onDeleteSubmit = () => {
    setActiveModal("delete-confirm");
  };

  const onCancel = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems((prev) => [...prev, data]);
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      validateToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/signin"
                element={
                  <LoginModal
                    isOpen={true}
                    onClose={closeActiveModal}
                    onLogin={closeActiveModal}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <RegisterModal
                    isOpen={true}
                    onClose={() => {}}
                    onRegister={handleRegister}
                    // onClose={handleRegister}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteCard={api.handleDeleteCard}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleDeleteCard={api.handleDeleteCard}
                      handleCardClick={handleCardClick}
                      onUpdateUser={handleUpdateUser}
                      onSignOut={handleSignOut}
                      onLogin={handleLogin}
                      onRegister={handleRegister}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
            />

            {/* const LoginModal = ({ isOpen, onClose, onLogin }) */}

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteItem={onDeleteSubmit}
              onCancel={onCancel}
            />

            {activeModal === "delete-confirm" && (
              <DeleteConfirmModal
                handleCloseClick={closeActiveModal}
                onDeleteItem={onDeleteItem}
                onCancel={onCancel}
              />
            )}
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
