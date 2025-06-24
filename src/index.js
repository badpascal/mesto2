import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, handleDeleteCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserProfile,
  updateUserAvatar,
  createCardApi,
  putLikeCard,
  deleteLikeCard,
  deleteCardApi,
} from "./components/api.js";
import {
  profileForm,
  cardForm,
  avatarForm,
  deleteCardForm,
  imagePopupBlock,
  profileTitle, 
  profileDescription,
  profileAvatar,
  editProfileButton,
  addProfileButton,
  editProfilePopup,
  newCardPopup,
  editAvatarPopup,
  deleteCardPopup,
  imagePopup,
  placesList,
  cardTemplate,
  popupCaption,
  validationConfig,
} from "./utils/constants.js";

import {handleSubmit} from "./utils/utils.js";

let userId;
let сardIdToDelete;
let cardElementToDelete;

const fillProfileData = ({ name, about, avatar }) => {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};

const handleClickEditProfileButton = () => {
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
  avatarForm.link.value = profileAvatar.style.backgroundImage.slice(5, -2);
};

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".popup")));
});

editProfileButton.addEventListener("click", () => {
  handleClickEditProfileButton();
  clearValidation(profileForm, validationConfig);
  openModal(editProfilePopup);
});

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateUserProfile({
      name: profileForm.elements.name.value,
      about: profileForm.elements.description.value,
    }).then((updatedProfile) => {
      fillProfileData(updatedProfile);
      closeModal(editProfilePopup);
    });
  }
  handleSubmit(makeRequest, evt);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileAvatar.addEventListener("click", () => {
  handleClickEditProfileButton();
  clearValidation(avatarForm, validationConfig);
  openModal(editAvatarPopup);
});

function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return updateUserAvatar(avatarForm.link.value).then((updatedProfile) => {
      fillProfileData(updatedProfile);
      closeModal(editAvatarPopup);
    });
  }

  handleSubmit(makeRequest, evt);
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

addProfileButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  function makeRequest() {
    const inputName = cardForm.elements["place-name"].value;
    const inputUrl = cardForm.elements.link.value;

    return createCardApi({ name: inputName, link: inputUrl }).then((card) => {
      placesList.prepend(
        createCard(
          card,
          userId,
          cardTemplate,
          putLikeCard,
          deleteLikeCard,
          handleImageClick,
          deleteCardAction
        )
      );
      cardForm.reset();
      closeModal(newCardPopup);
    });
  }

  handleSubmit(makeRequest, evt);
}

cardForm.addEventListener("submit", handleCardFormSubmit);

function handleImageClick(link, name) {
  imagePopup.src = link;
  imagePopup.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopupBlock);
}

function deleteCardAction(cardId, cardElement) {
  openModal(deleteCardPopup);
  сardIdToDelete = cardId;
  cardElementToDelete = cardElement;
}

deleteCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleDeleteCard(
    сardIdToDelete,
    cardElementToDelete,
    deleteCardApi,
    closeModal,
    deleteCardPopup
  );
});

function loadInitialCards(location, userDataId, initialCards) {
  initialCards.forEach((card) => {
    location.append(
      createCard(
        card,
        userDataId,
        cardTemplate,
        putLikeCard,
        deleteLikeCard,
        handleImageClick,
        deleteCardAction
      )
    );
  });
}

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    fillProfileData(userInfo);
    userId = userInfo._id;

    loadInitialCards(placesList, userInfo._id, initialCards);
  })
  .catch((err) => {
    console.log(err);
  });
