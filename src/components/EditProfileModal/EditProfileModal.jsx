import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    onUpdateUser({ name, avatar })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save"}
      isDisabledg={isLoading}
    >
      <label>
        Name
        <input
          type="text"
          value={name}
          placeholder="Name"
          className="modal__input modal__input-name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Avatar URL
        <input
          type="url"
          value={avatar}
          placeholder="Avatar URL"
          className="modal__input modal__input-avatar-url"
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="modal__save-changes">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
