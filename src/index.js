import './index.css';
// Кнопки
const headerAuthButton = document.querySelector('.header__auth-button');
const popupButtonReg = document.querySelector('.popup__button');
const popupButtonEntry = document.querySelector('.popup__button-entry');

// Попапы + переход
const popupReg = document.querySelector('.popup-reg');
const popupEntry = document.querySelector('.popup-entry');
const popupSuccess = document.querySelector('.popup-success');
const popupForwardReg = document.querySelector('.popup__forwarding');
const popupForwardEntry = document.querySelector('.popup__forwarding-entry');
const popupForwardSuccess = document.querySelector('.popup__come-in');

// Закрытие попапов
const closePopupReg = document.querySelector('.popup__close');
const closePopupEntry = document.querySelector('.popup__close-entry');
const closePopupSuccess = document.querySelector('.popup__close-success');

// Фукнции

function openPopup(popup) {
  popup.classList.add('popup-is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup-is-opened');
}

// Обработчики

headerAuthButton.addEventListener('click', () => {
  openPopup(popupReg);
});

closePopupReg.addEventListener('click', () => {
  closePopup(popupReg);
});

popupForwardReg.addEventListener('click', () => {
  openPopup(popupEntry);
  closePopup(popupReg);
});

popupForwardEntry.addEventListener('click', () => {
  closePopup(popupEntry);
  openPopup(popupReg);
});

closePopupEntry.addEventListener('click', () => {
  closePopup(popupEntry);
});

popupButtonReg.addEventListener('click', () => {
  closePopup(popupReg);
  openPopup(popupSuccess);
});

popupForwardSuccess.addEventListener('click', () => {
  closePopup(popupSuccess);
  openPopup(popupEntry);
});

closePopupSuccess.addEventListener('click', () => {
  closePopup(popupSuccess);
});

popupButtonEntry.addEventListener('click', () => {
  closePopup(popupEntry);
});
