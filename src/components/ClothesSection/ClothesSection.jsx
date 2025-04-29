import "./clothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
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
        {clothingItems.map((filteredCard) => {
          <ItemCard
            key={filteredCard._id}
            card={filteredCard}
            onCardClick={onCardClick}
          />;
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
