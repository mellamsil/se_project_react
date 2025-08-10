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
// import { signup } from "./api.js";
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
  // isLoading,
  // onSignUpButtonClick,
} from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
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

  // function to open delete confirmation modal
  const handleCardDeleteClick = (itemId) => {
    setItemToDelete(itemId);
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
    const token = localStorage.getItem("jwt"); // usually token isn't needed for signup, but just in case

    // Assuming api.signup returns a Promise (fetch or axios)
    return api
      .signup(formData) // <-- This must return a Promise!
      .then((data) => {
        // handle success if needed
        return data; // IMPORTANT: return data for chaining in RegisterModal
      })
      .catch((err) => {
        console.error("Registration error:", err);
        throw err; // re-throw error so RegisterModal can catch it
      });
  };
  // const handleRegister = (formData, onSuccess, onError) => {
  //   register(formData)
  //     .then(() => {
  //       return handleLogin({
  //         email: formData.email,
  //         password: formData.password,
  //       });
  //     })
  //     .then((user) => {
  //       if (onSuccess) onSuccess(user);
  //     })

  //     .catch((err) => {
  //       console.error("Registration error:", err?.message || err);
  //       if (onError) onError(err);
  //     });
  // };

  const handleLogin = ({ email, password }) => {
    return login(email, password) // must return promise
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
        return user; // so handleRegister can use it
      })
      .catch((err) => {
        console.error("Login error:", err.message);
        throw err; // rethrow so handleRegister's catch can run
      });
  };

  const login = (email, password) => {
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

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");

    if (!Array.isArray(likes) || !currentUser?._id) {
      console.warn("Cannot process like: missing likes array or current user.");
      return;
    }
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

  // Step 1: Open delete confirmation modal
  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId); // store ID for later
    setActiveModal("delete-confirm"); // show modal
  };

  // Step 2: Actually delete the item
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem("jwt");

    api
      .handleDeleteCard(itemToDelete, token)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete)
        );
        setActiveModal("");
        setItemToDelete(null);
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // const onDeleteItem = () => {
  //   const token = localStorage.getItem("jwt");

  //   api
  //     .handleDeleteCard(selectedCard._id, token)
  //     .then(() => {
  //       setClothingItems((prev) =>
  //         prev.filter((card) => card._id !== selectedCard._id)
  //       );
  //       closeActiveModal();
  //     })
  //     .catch((err) => {
  //       console.error("Unable to delete clothing item due to:", err);
  //     });
  // };

  const onDeleteSubmit = (itemId) => {
    setItemToDelete(itemId); // store ID for later
    setActiveModal("delete-confirm"); // show modal
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
        // setClothingItems((prev) => [...prev, ...data]);
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
                      onSignOut={handleSignOut}
                      onLogin={handleLogin}
                      onRegister={handleRegister}
                      currentUser={currentUser}
                      handleEditProfileClick={handleEditProfileClick}
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

            {/* {activeModal === "add-garment" && (
              <AddItemModal
                isOpen={true}
                onClose={closeActiveModal}
                onAddItemModalSubmit={(item) => {
                  const token = localStorage.getItem("jwt");
                  return api
                    .addItem(item, token)
                    .then((newItem) => setItems((prev) => [newItem, ...prev]))
                    .catch((err) => console.error("Add error:", err));
                }}
              />
            )} */}

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              // isLoading={isLoading}
              // onSignUpButtonClick={openRegisterModal}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteItem={onDeleteSubmit}
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
                onDeleteItem={onDeleteItem}
                onCancel={onCancel}
              />
            )}

            {items.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDelete={() => handleCardDeleteClick(card._id)}
                onLike={() => handleCardLike(card)}
              />
            ))}
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
