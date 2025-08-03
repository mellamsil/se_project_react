import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    onLogin({ email, password });
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Login"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="modal__input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="modal__input"
      />

      <div className="modal__submit-button-container">
        <button
          type="submit"
          className={`modal__submit modal__submit_caption ${
            isFormValid ? "modal__submit--active" : ""
          }`}
          disabled={!isFormValid}
        >
          Login
        </button>
        <button
          type="button"
          className="modal__submit modal__nav_button"
          onClick={onClose}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
