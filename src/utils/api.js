const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(` ${baseUrl}/items`).then((res) => checkResponse(res));
  // .then((res) => {
  //   return res.ok ? res.json() : Promise.reject("Error: ${res.status}");
  // });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name: name, imageUrl: imageUrl, weather: weather }),
  }).then((res) => checkResponse(res));
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

// function addNewCards({ name, link}) {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: this._headers,
//     body: JSON.stringify(card),
//   }).then((res) => {
//     return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//   });
// }

// function deleteItems(id) {
//   return fetch(`${baseUrl}/items/${id}`, {
//     method: "DELETE"
//     headers: this._headers,
//     body: JSON.stringify(card)
//       }).then((res) => {
//         return res.ok ? res.json() : Promise.reject(`Error: `)
//       })
// }
