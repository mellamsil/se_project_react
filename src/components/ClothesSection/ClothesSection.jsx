import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  handleAddClick,
  clothingItems,
  onCardClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Only show items that belong to the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button
          type="button"
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={onCardClick}
            handleCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
