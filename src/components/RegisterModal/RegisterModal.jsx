import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   onRegister(formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    onRegister(formData)
      .then(() => {
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        setError("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {error && <p className="modal-error">{error}</p>}

      <label className="modal__label">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="modal__input modal__input-name"
        />
      </label>
      <label className="modal__label">
        Avatar URL:
        <input
          id="avatar"
          type="url"
          name="avatar"
          placeholder="Enter your avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          required
          className="modal__input modal__input-avatar-url"
        />
      </label>
      <label className="modal__label">
        Email:
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="modal__input modal__input-email"
        />
      </label>

      <label className="modal__label">
        Password:
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="modal__input modal__input-password"
        />
      </label>
      {/* <label className="modal__label">
        Confirm Password:
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="modal__input"
        />
      </label> */}
      <div>
        <button
          type="submit"
          className="modal__submit modal__submit_caption modal__submit--active"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
        {/* <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button> */}

        {/* <button
        type="submit"
        className={`modal__submit modal__submit_caption ${
          isFormValid ? "modal__submit--active" : ""
        }`}
        disabled={!isFormValid}
      >
        Login
      </button> */}
        <button
          type="button"
          className="modal__login modal__login-button"
          onClick={onClose}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
