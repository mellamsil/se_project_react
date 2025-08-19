import { useState } from "react";
// import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import ItemModal from "../ItemModal/ItemModal";
import "./Profile.css";

function Profile({
  handleAddClick,
  handleCardClick,
  onCardClick,
  clothingItems,
  handleDeleteCard,
  // onUpdateUser,
  onSignOut,
  handleEditProfileClick,
  handleCardLike,
  currentUser,
}) {
  // Modal state
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCardModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  // Edit profile modal state
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const handleOpenEditModal = () => setIsEditModalOpen(true);
  // const handleCloseEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleAddClick={handleAddClick}
          onCardClick={handleCardClick}
          currentUser={currentUser}
          onSignOut={onSignOut}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>

      {/* <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdateUser={onUpdateUser}
      /> */}

      {/* ItemModal */}
      <ItemModal
        card={selectedCard}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDeleteItem={handleDeleteCard}
      />
    </div>
  );
}

export default Profile;
