import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, avatar } = formData;

    if (!email.trim() || !password.trim() || !name.trim() || !avatar.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");
    setIsLoading(true);

    // onRegister must return a Promise
    onRegister({ name, email, password, avatar })
      .then((data) => {
        setIsLoading(false);
        console.log("Registration successful:", data);
        onClose(); // close modal after successful registration
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setError(err.message || "Registration failed. Please try again.");
      })
      .finally(() => setIsLoading(false));
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

      <div>
        <button
          type="submit"
          className="modal__submit modal__submit_caption modal__submit--active"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>

        <button
          type="button"
          className="modal__login modal__login-button"
          // instead of calling onClose when we click this button, we should call the function that opens up the sign-up modal
          onClick={onLoginClick}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
// import "./RegisterModal.css";

// const RegisterModal = ({ isOpen, onClose, onRegister }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     avatar: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, password, avatar } = formData;

//     if (!email.trim() || !password.trim() || !name.trim() || !avatar) {
//       setError("All fields are required");

//       return;
//     }

//     setError("");
//     setLoading(true);

//     // onRegister must return a promise
//     onRegister({ name, email, password, avatar })
//       .then((data) => {
//         console.log("Registration successful:", data);

//         onClose();

//       })
//       .catch((err) => {
//         console.error("Registration error:", err);
//         setError(err.message || "Registration failed. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   };

//   return (
//     <ModalWithForm
//       title="Sign Up"
//       isOpen={isOpen}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//     >
//       {error && <p className="modal-error">{error}</p>}

//       <label className="modal__label">
//         Name:
//         <input
//           id="name"
//           type="text"
//           name="name"
//           placeholder="Enter your name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="modal__input modal__input-name"
//         />
//       </label>
//       <label className="modal__label">
//         Avatar URL:
//         <input
//           id="avatar"
//           type="url"
//           name="avatar"
//           placeholder="Enter your avatar URL"
//           value={formData.avatar}
//           onChange={handleChange}
//           required
//           className="modal__input modal__input-avatar-url"
//         />
//       </label>
//       <label className="modal__label">
//         Email:
//         <input
//           id="email"
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="modal__input modal__input-email"
//         />
//       </label>

//       <label className="modal__label">
//         Password:
//         <input
//           id="password"
//           type="password"
//           name="password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="modal__input modal__input-password"
//         />
//       </label>

//       <div>
//         <button
//           type="submit"
//           className="modal__submit modal__submit_caption modal__submit--active"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Sign Up"}
//         </button>

//         <button
//           type="button"
//           className="modal__login modal__login-button"
//           onClick={onClose}
//         >
//           or Login
//         </button>
//       </div>
//     </ModalWithForm>
//   );
// };

// export default RegisterModal;
