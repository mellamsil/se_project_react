import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  currentUser,
  onCardLike,
  onCardDelete,
  handleCardLike,
  handleCardDeleteClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
                currentUser={currentUser}
                handleCardLike={handleCardLike}
                handleCardDeleteClick={handleCardDeleteClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
