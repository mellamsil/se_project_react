import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { login } from "../../utils/auth";
import { checkToken } from "../../utils/auth"; // if using
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return checkToken(data.token);
        }
        throw new Error("Login failed: no token");
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        onClose();
      })
      .catch((err) => {
        console.error("Login error:", err.message || err);
      });
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

// Second changes
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginModal.css";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";

// // LoginModal Component
// // We need to pass onLogin as a prop from the App.jsx file?
// const LoginModal = ({ isOpen, onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (typeof onLogin === "function") {
//       onLogin({ email, password });
//     } else {
//       console.error("onLogin is not a function");
//     }
//   };

//   if (!isOpen) return null;

//   const isFormValid = email.trim() !== "" && password.trim() !== "";

//   return (
//     <ModalWithForm
//       title="Sign In"
//       isOpen={isOpen}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//       buttonText=""
//     >
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="modal__input"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="modal__input"
//       />

//       <div className="modal__submit-button-container">
//         <button
//           type="submit"
//           className={`modal__submit modal__submit_caption ${
//             isFormValid ? "modal__submit--active" : ""
//           }`}
//           disabled={!isFormValid}
//         >
//           Login
//         </button>
//         {/* <span className="modal__or-text">or</span> */}
//         <button
//           type="button"
//           className="modal__submit modal__nav_button"
//           onClick={onClose}
//         >
//           or Sign Up
//         </button>
//       </div>
//     </ModalWithForm>
//   );
// };

// export default LoginModal;

// Modified code
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginModal.css";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Optional wrapper for error-handled login
// export const handleLogin = ({ email, password }, onSuccess, onError) => {
//   loginUser({ email, password })
//     .then((data) => {
//       console.log("Login successful");
//       onSuccess?.(data);
//     })
//     .catch((err) => {
//       console.error("Login failed:", err.message);
//       onError?.(err);
//     });
// };

// // LoginModal Component
// const LoginModal = ({ isOpen, onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin({ email, password }); // Callback from parent
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWithForm
//       title="Sign In"
//       isOpen={isOpen}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//     >
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit" className="modal__submit modal__submit_caption">
//         Login
//       </button>
//       <button
//         type="button"
//         className="modal__submit modal__link_button"
//         onClick={onClose}
//       >
//         Sign Up
//       </button>
//     </ModalWithForm>
//   );
// };

// export default LoginModal;

// Old Code

// import { useState } from "react";
// import { authorize } from "../utils/auth"; // optional if you're using loginUser here
// import "./LoginModal.css";

// // LoginModal Component
// const LoginModal = ({ isOpen, onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin({ email, password }); // passed from App.jsx
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <form className="modal__form" onSubmit={handleSubmit}>
//         <h2>Sign In</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         <button type="button" onClick={onClose}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// // Utility function to log in user (used in App.jsx)
// export const loginUser = async ({ email, password }) => {
//   const res = await fetch("/signin", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) throw new Error("Login failed");

//   const data = await res.json();
//   localStorage.setItem("jwt", data.token);
//   return data;
// };

// // Optional wrapper for error-handled login
// export const handleLogin = ({ email, password }, onSuccess, onError) => {
//   loginUser({ email, password })
//     .then((data) => {
//       console.log("Login successful");
//       onSuccess?.(data);
//     })
//     .catch((err) => {
//       console.error("Login failed:", err.message);
//       onError?.(err);
//     });
// };

// export default LoginModal;
