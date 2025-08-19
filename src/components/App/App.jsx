import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import * as api from "../../utils/api.js";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import "./App.css";

import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import {
  register,
  login,
  validateToken,
  updateUserProfile,
  checkToken,
} from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems); // here we hold all our cards, therefore if zou remove one, zou need to update this array again!
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
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
    setSelectedCard(null);
  };

  const handleCardDeleteClick = (id) => {
    setItemToDelete(id);
    setActiveModal("delete-confirm");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return Promise.reject("No token found");
    }

    return validateToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);

        return api.addItem({ name, imageUrl, weather }, token);
      })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error during add item process:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        throw err;
      });
  };

  const handleRegister = (formData, onSuccess, onError) => {
    const token = localStorage.getItem("jwt");

    // Assuming api.signup returns a Promise (fetch or axios)
    return api
      .signup(formData)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error("Registration error:", err);
        throw err;
      });
  };

  const handleLogin = ({ email, password }) => {
    return login(email, password)
      .then((data) => {
        if (!data?.token) {
          throw new Error("Login failed: no token");
        }
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeActiveModal();
        return user;
      })
      .catch((err) => {
        console.error("Login error:", err.message);
        throw err;
      });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return updateUserProfile(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    return isLiked
      ? api
          .removeCardLike(id, token)
          .then(({ data }) => {
            setClothingItems((items) =>
              items.map((item) => {
                return item._id === id ? data : item;
              })
            );
          })
          .catch((error) => console.log(error))
      : api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log(error));
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("jwt");

    api
      .handleDeleteCard(itemToDelete, token)
      .then(() => {
        setClothingItems((prevItems) => {
          return prevItems.filter((item) => item._id !== itemToDelete);
        });

        closeActiveModal();
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const onCancel = () => {
    closeActiveModal();
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
        setClothingItems(data);
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
        .catch((err) => {
          console.error("Token validation error:", err);
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
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onSignOut={handleSignOut}
            />

            <Routes>
              <Route
                path="/signup"
                element={
                  <RegisterModal
                    isOpen={true}
                    onClose={() => {}}
                    onRegister={handleRegister}
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
                    items={items}
                    onCardDelete={handleCardDeleteClick}
                    handleCardLike={handleCardLike}
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
                      onSignOut={handleSignOut}
                      onLogin={handleLogin}
                      onRegister={handleRegister}
                      currentUser={currentUser}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                      handleDeleteClick={handleCardDeleteClick}
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
              onLoginClick={handleLoginClick}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onRegisterClick={handleRegisterClick}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteItem={handleCardDeleteClick}
              onCancel={onCancel}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />

            {activeModal === "delete-confirm" && (
              <DeleteConfirmModal
                handleCloseClick={closeActiveModal}
                onDeleteItem={handleConfirmDelete}
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
