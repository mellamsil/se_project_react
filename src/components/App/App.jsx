import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { addItem, getItems, handleDeleteCard } from "../../utils/api.js";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather }).then((res) => {
      setClothingItems((prevItems) => {
        return [{ ...res }, ...prevItems];
      });
      closeActiveModal();
    });
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function onDeleteItem() {
    handleDeleteCard(selectedCard._id)
      .then(() => {
        setClothingItems((prevClothingItems) =>
          prevClothingItems.filter((card) => {
            if (card._id === selectedCard._id) {
              return false;
            } else {
              return true;
            }
          })
        );

        setActiveModal("");
        closeActiveModal;
      })
      .catch((err) => {
        console.error(`Unable to delete clothing item due to: ${err}`);
      });
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const onDeleteSubmit = () => {
    setActiveModal("delete-confirm");
  };

  const onCancel = () => {
    setActiveModal("cancel-confirm");
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleDeleteCard={handleDeleteCard}
                />
              }
            />
            <Route
              path="/profile"
              element={
                clothingItems.length !== 0 && (
                  <Profile
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                    handleDeleteCard={handleDeleteCard}
                    handleCardClick={handleCardClick}
                  />
                )
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
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
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
