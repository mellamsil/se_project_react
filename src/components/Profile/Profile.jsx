import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleAddClick,
  onCardClick,
  clothingItems,
  handleCardClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleAddClick={handleAddClick} onCardClick={onCardClick} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
