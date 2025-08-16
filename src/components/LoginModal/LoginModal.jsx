import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  isLoading,
  onRegisterClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setWarning("Email and password are required");
      setPasswordWarning(false);

      return;
    }

    setWarning("");
    setPasswordWarning(false);

    onLogin({ email, password })
      .then(() => {
        // Successful login
        setWarning("");
        setPasswordWarning(false);
      })
      .catch(() => {
        // Show password warning on login failure
        setPasswordWarning(true);
        setWarning("");
      });
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Login"
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
            onChange={(e) => {
              setEmail(e.target.value);
              setWarning("");
              setPasswordWarning(false);
            }}
            required
          />
        </label>
      </div>

      <div className="modal__password-container">
        {/* Show password warning instead of label if triggered */}
        {passwordWarning ? (
          <p className="modal__password-warning">Incorrect password</p>
        ) : (
          <label className="modal__label">Password</label>
        )}
        <input
          type="password"
          name="password"
          className="modal__input modal__input_password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setWarning("");
            setPasswordWarning(false);
          }}
          required
        />
      </div>

      {/* General warning below password input */}
      {warning && <p className="modal__warning">{warning}</p>}

      <div className="modal__submit-button-container">
        <button
          type="submit"
          className={`modal__submit modal__submit_caption ${
            isLoading
              ? "modal__submit--loading"
              : isFormValid
              ? "modal__submit--active"
              : "modal__submit--empty"
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Logging in…" : "Login"}
        </button>
        <button
          type="button"
          className="modal__submit modal__nav_button"
          onClick={onRegisterClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
