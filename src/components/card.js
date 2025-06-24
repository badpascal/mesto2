function createCard(
  card,
  userDataId,
  cardTemplate,
  putLikeCard,
  deleteLikeCard,
  handleImageClick,
  handleDeleteCard,
  deleteCardAction
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardCounter = cardElement.querySelector(".card__like-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  updateLikesDisplay(card, cardCounter);
  countingCardLikes(card.likes, userDataId, likeButton);
  deletingCardButton(
    card,
    userDataId,
    cardElement,
    deleteButton,
    handleDeleteCard,
    deleteCardAction
  );

  cardImage.addEventListener("click", () => {
    handleImageClick(card.link, card.name);
  });

  likeButton.addEventListener("click", () => {
    const isLikedByUser = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const action = isLikedByUser ? deleteLikeCard : putLikeCard;
    handleLikeCard(card._id, likeButton, cardCounter, action, userDataId);
  });

  return cardElement;
}

function countingCardLikes(likesArray, userDataId, likeButton) {
  if (likesArray.some((item) => item._id === userDataId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

function deletingCardButton(
  card,
  userDataId,
  cardElement,
  deleteButton,
  deleteCardAction
) {
  if (userDataId === card.owner._id) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteCardAction(card._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }
}

function handleDeleteCard(
  cardId,
  cardElement,
  deleteCardApi,
  closeModal,
  deleteCardPopup
) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deleteCardPopup);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleLikeCard(cardId, likeButton, cardCounter, action, userDataId) {
  action(cardId)
    .then((card) => {
      const isLikedByUserAfterAction = card.likes.some(
        (like) => like._id === userDataId
      );
      likeButton.classList.toggle(
        "card__like-button_is-active",
        isLikedByUserAfterAction
      );
      updateLikesDisplay(card, cardCounter);
    })
    .catch((err) => {
      console.error(err);
    });
}

function updateLikesDisplay(card, cardCounter) {
  cardCounter.textContent = card.likes.length;

  cardCounter.classList.toggle(
    "card__like-counter_is-active",
    card.likes.length > 0
  );
}

export { createCard, handleDeleteCard };
