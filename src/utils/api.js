import { BASE_URL } from "../utils/constants";

// Helper to handle fetch response
// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Error: ${res.status}`);
// }
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .then((err) => {
      throw new Error(err.message || `Error: ${res.status}`);
    })
    .catch(() => {
      throw new Error(`Error: ${res.status}`);
    });
}

// Generic request wrapper (optional usage)
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Fetch all items
function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

const signup = ({ name, email, password, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, avatar }),
  }).then(checkResponse);
};

// LOGIN user
const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      // Try to parse backend's error JSON
      return res
        .json()
        .then((err) => {
          throw new Error(
            err.message || `Login failed with status ${res.status}`
          );
        })
        .catch(() => {
          // If response isn't JSON (e.g. 500 error), fallback to generic
          throw new Error(`Login failed with status ${res.status}`);
        });
    }
    return res.json();
  });
};

// Add a new item
function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// Delete an item by ID (added Authorization header assuming secured endpoint)
function handleDeleteCard(id, token) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Validate JWT token
function validateToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

// Add a like to an item
function addCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Remove a like from an item
function removeCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Get user info
function getUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Export all functions
export {
  signup,
  login,
  checkResponse,
  request,
  getItems,
  addItem,
  handleDeleteCard,
  validateToken,
  addCardLike,
  removeCardLike,
  getUser,
};
