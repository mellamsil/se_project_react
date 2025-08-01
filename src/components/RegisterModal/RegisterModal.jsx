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
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    onRegister(formData);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {error && <p className="modal-error">{error}</p>}

      <label>Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Avatar URL:</label>
      <input
        id="avatar"
        type="url"
        name="avatar"
        placeholder="https://..."
        value={formData.avatar}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="email@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <label>Confirm Password:</label>
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
