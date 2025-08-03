import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
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
    onUpdateUser({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Edit Profile</h2>
          <input
            type="text"
            placeholder="Name"
            className="modal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Avatar URL"
            className="modal__input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
          <button type="submit" className="modal__submit-button">
            Save
          </button>
          <button
            type="button"
            className="modal__close-button"
            onClick={onClose}
            aria-label="Close"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
