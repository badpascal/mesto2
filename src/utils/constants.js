const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const avatarForm = document.forms["edit-avatar"];
const deleteCardForm = document.forms["delete-card"];
const imagePopupBlock = document.querySelector(".popup_type_image");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const imagePopup = imagePopupBlock.querySelector(".popup__image");

const placesList = document.querySelector(".places__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");
const popupCaption = imagePopupBlock.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export {
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
};
