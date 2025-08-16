import { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleAddClick,
  handleCardClick,
  onCardClick,
  clothingItems,
  handleDeleteCard,
  onUpdateUser,
  onSignOut,
  currentUser,
  handleEditProfileClick,
  handleCardLike,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          currentUser={currentUser}
          onSignOut={onSignOut}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

export default Profile;
