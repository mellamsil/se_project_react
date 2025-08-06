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
          handleCardClick={handleCardClick}
        />
      </section>

      {/* <section className="profile__controls">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="profile__edit-button"
        >
          Edit profile
        </button>
        <button onClick={onSignOut} className="profile__signout-button">
          Sign out
        </button>
      </section> */}

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

export default Profile;
