import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // fixed import path
import "./ItemCard.css";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser?._id;

  // Check if the item is liked by the current user
  const isLiked = item.likes?.includes(currentUser?._id);

  // Class name for like button based on like state
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    if (onCardLike) {
      onCardLike(item);
    }
  };

  const handleImageClick = () => {
    if (handleCardClick) {
      handleCardClick(item);
    }
  };

  return (
    <li className="card">
      <img
        // src={item.link}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleImageClick}
      />
      <h2 className="card__title">{item.name}</h2>
      {isLoggedIn && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label="Like button"
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
