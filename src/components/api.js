const config = {
  baseUrl: "https://nomoreparties.co/v1/apf-cohort-202",
  headers: {
    authorization: "f9be2deb-f0f3-479e-a563-52a0689bd92b",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleResponse);
}

const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
};

const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
};

const updateUserProfile = (userData) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  });
};

const createCardApi = ({ name, link }) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

const deleteCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

const putLikeCard = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

const deleteLikeCard = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

const updateUserAvatar = (avatarUrl) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
};

export {
  getUserInfo,
  getInitialCards,
  updateUserProfile,
  createCardApi,
  deleteCardApi,
  putLikeCard,
  deleteLikeCard,
  updateUserAvatar,
};
