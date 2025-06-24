const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  inputElement.setCustomValidity("");

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const disableButton = (submitButtonElement, inactiveButtonClass) => {
  submitButtonElement.disabled = true;
  submitButtonElement.classList.add(inactiveButtonClass);
};

const toggleButtonState = (
  inputList,
  submitButtonElement,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButtonElement, inactiveButtonClass);
  } else {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  formElement.addEventListener("reset", () => {
    disableButton(submitButtonElement, inactiveButtonClass);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    });
  });
};

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  disableButton(submitButtonElement, validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
};

export { enableValidation, clearValidation };
