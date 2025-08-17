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

  // Separate warnings
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setEmailWarning(email.trim() ? "" : "Email or password incorrect");
      setPasswordWarning(password.trim() ? false : true);
      return;
    }

    // Reset warnings before request
    setEmailWarning("");
    setPasswordWarning(false);

    onLogin({ email, password })
      .then(() => {
        // Success → clear warnings
        setEmailWarning("");
        setPasswordWarning(false);
      })
      .catch((err) => {
        if (err?.field === "email") {
          setEmailWarning("Email or password incorrect");
          setPasswordWarning(false);
        } else if (err?.field === "password") {
          setPasswordWarning(true);
          setEmailWarning("");
        } else {
          // If unsure, show both
          setEmailWarning("Email or password incorrect");
          setPasswordWarning(true);
        }
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
      {/* Email field */}
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
              setEmailWarning("");
            }}
            required
          />
        </label>
      </div>

      {/* Password field */}
      <div className="modal__password-container">
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
            setPasswordWarning(false);
          }}
          required
        />
      </div>

      {/* Email warning below password field */}
      {emailWarning && <p className="modal__warning">{emailWarning}</p>}

      {/* Submit + navigation */}
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
