function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popup.addEventListener("click", handleOutsideClick);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  popup.removeEventListener("click", handleOutsideClick);
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function handleOutsideClick(event) {
  const popup = event.target.closest(".popup");
  if (event.target === popup) {
    closeModal(popup);
  }
}

export { openModal, closeModal };
