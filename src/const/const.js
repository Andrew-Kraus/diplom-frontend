export const cardsArray = [];
export const results = document.querySelector('.results');
export const resultNotFound = document.querySelector('.not-found');
export const finderInput = document.querySelector('.finder__search-input');
export const showMoreButton = document.querySelector('.results__show-more');
export const count = 3;
export const finderButton = document.querySelector('.finder__button');
export const cards = document.querySelector('.results__grid');
export const userName = document.querySelector('.header__profile-button');
export const headerR = document.getElementById('headerreg');
export const headerA = document.getElementById('headerauth');
export const userHeader = document.querySelector('.header__profile-button');
export const objStatus = {
  statusLogin: 'Login',
  statusNoLogin: 'NoLogin',
  statusCardSave: 'CardSave',
};
export const imageNull = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
export const monthSplit = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
export const msDay = 86400000;

export function getDate() {
  const todayDate = new Date();
  const dateInMs = 6 * msDay;
  const lastDate = new Date(todayDate.getTime() - dateInMs);
  const dateFrom = lastDate.toISOString().slice(0, 10);
  const dateTo = todayDate.toISOString().slice(0, 10);

  return { dateFrom, dateTo };
}

export function setDate(data) {
  const date = new Date(data);
  const month = monthSplit[date.getMonth()];

  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
}

export const headerAuthButton = document.querySelector('.header__auth-button');
export const popupButtonReg = document.querySelector('.popup__button');
export const popupButtonEntry = document.querySelector('.popup__button-entry');
export const popupErrorReg = document.querySelector('.popup__error-exist');
export const popupErrorEnt = document.querySelector('.popup__error-exist-ent');
export const popupR = document.querySelector('.popup-reg');
export const popupE = document.querySelector('.popup-entry');
export const popupS = document.querySelector('.popup-success');
export const popupForwardReg = document.querySelector('.popup__forwarding');
export const popupForwardEntry = document.querySelector('.popup__forwarding-entry');
export const popupForwardSuccess = document.querySelector('.popup__come-in');

// Закрытие попапов
export const closePopupReg = document.querySelector('.popup__close');
export const closePopupEntry = document.querySelector('.popup__close-entry');
export const closePopupSuccess = document.querySelector('.popup__close-success');

export const inputEmail = document.querySelector('.popup__email');
export const inputPass = document.querySelector('.popup__password');
export const inputName = document.querySelector('.popup__name');
export const API_URL = NODE_ENV === 'production' ? 'https://cors-anywhere.herokuapp.com/https://diplombackend.students.nomoreparties.co' : 'https://cors-anywhere.herokuapp.com/http://diplombackend.students.nomoreparties.co';
export const API_NEWS = NODE_ENV === 'production' ? 'https://newsapi.org/v2/' : 'https://nomoreparties.co/news/v2/';
export const formReg = document.forms.popupReg;
export const formEnt = document.forms.popupEntry;
export const inputEmailEnt = document.querySelector('.popup__email-ent');
export const inputPassEnt = document.querySelector('.popup__password-ent');
export const cardsGrid = document.querySelector('.articles__grid');
export const articlesSection = document.querySelector('.articles');
