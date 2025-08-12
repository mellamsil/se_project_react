import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  isLoading,
  onSignUpButtonClick,
}) => {
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
      title="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Login"
      isLoading={isLoading}
    >
      <div className="modal__email-container">
        <label className="modal__label">
          Email
          <input
            type="email"
            name="email"
            className="modal__input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="modal__passowrd-container">
        <label className="modal__label">
          Password
          <input
            type="password"
            name="password"
            className="modal__input modal__input_password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
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
