const baseUrl = "http://localhost:3001";

// Helper to handle fetch response
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Generic request wrapper (optional usage)
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Fetch all items
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

const signup = ({ name, email, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, avatar }),
  }).then(checkResponse);
};

// Add a new item
function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
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
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Validate JWT token
function validateToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

// Add a like to an item
function addCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Remove a like from an item
function removeCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Get user info
function getUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Export all functions
export {
  signup,
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
