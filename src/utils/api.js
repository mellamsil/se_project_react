const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(` ${baseUrl}/items`).then((res) => checkResponse(res));
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name: name, imageUrl: imageUrl, weather: weather }),
  });
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: $(res.status)`);
}

function handleDeleteCard(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => checkResponse(res));
}

export { getItems, handleDeleteCard, addItem };
