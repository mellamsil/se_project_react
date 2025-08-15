import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // fixed import path
import "./ItemCard.css";

function ItemCard({
  item,
  handleCardClick,
  handleCardLike,
  handleCardDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser?._id;

  if (!item || !item.likes) {
    return null;
  }

  const isLiked = item.likes.some((id) => id === currentUser._id);
  const isOwn = item.owner === currentUser._id;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };

  const handleImageClick = () => {
    if (handleCardClick) {
      handleCardClick(item);
    }
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(item);
    }
  };

  return (
    <li className="card">
      <img
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
