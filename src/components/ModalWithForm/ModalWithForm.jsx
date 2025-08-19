import React from "react";
import useEscapeOverlayClose from "../../hooks/useEscapeOverlayClose";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
}) {
  // Add Escape + overlay handling
  useEscapeOverlayClose(isOpen, onClose);
  return (
    // <div className={`modal ${isOpen && "modal_opened"}`}>
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
