import './index.css';
import FormValidator from './FormValidator';
import Api from './Api';
import Popup from './Popup';
import Header from './Header';
import NewsApi from './NewsApi';
import SearchNews from './SearchNews';
import NewsArray from './NewsArray';
import ArticlePattern from './ArticlePattern';
import {
  count,
  cards,
  cardsArray,
  userName,
  showMoreButton,
  headerA,
  headerR,
  userHeader,
  headerAuthButton,
  popupButtonReg,
  popupButtonEntry,
  popupErrorReg,
  popupErrorEnt,
  popupR,
  popupE,
  popupS,
  popupForwardEntry,
  popupForwardReg,
  popupForwardSuccess,
  closePopupReg,
  closePopupEntry,
  closePopupSuccess,
  inputEmail,
  inputPass,
  inputName,
  API_NEWS,
  API_URL,
  formReg,
  formEnt,
  inputEmailEnt,
  inputPassEnt,
  finderButton,
} from './const/const';

const popupReg = new Popup(popupR);
const popupEnt = new Popup(popupE);
const popupSuccess = new Popup(popupS);
const popupRegValidator = new FormValidator(formReg, popupButtonReg);
const popupEntValidator = new FormValidator(formEnt, popupButtonEntry);
const api = new Api(API_URL);
const headerReg = new Header(headerR, api, userHeader);
const headerAuth = new Header(headerA, api, userHeader);
const newsApi = new NewsApi(API_NEWS);
const article = new ArticlePattern(api, cardsArray);
const cardList = new NewsArray(cards, cardsArray, count, article, api, userName);
const searchNews = new SearchNews(newsApi, cardList);

cards.addEventListener('click', article.articleHandler);
finderButton.addEventListener('click', searchNews.getNews);

showMoreButton.addEventListener('click', () => {
  cardList.showMoreButton(showMoreButton);
});

headerAuthButton.addEventListener('click', () => {
  popupReg.open();
  popupRegValidator.checkInputValid();
  popupRegValidator.setEventListeners();
});

closePopupReg.addEventListener('click', () => {
  popupReg.close();
  formReg.reset();
});

popupForwardReg.addEventListener('click', () => {
  popupReg.close();
  formReg.reset();
  popupEnt.open();
  popupEntValidator.checkInputValid();
  popupEntValidator.setEventListeners();
});

popupForwardEntry.addEventListener('click', () => {
  popupEnt.close();
  popupReg.open();
  formEnt.reset();
});

closePopupEntry.addEventListener('click', () => {
  popupEnt.close();
  formEnt.reset();
});

popupButtonReg.addEventListener('click', () => {
  api.createUser(inputName.value, inputEmail.value, inputPass.value)
    .then(() => {
      popupSuccess.open();
      popupReg.close();
    })
    .catch(() => {
      popupErrorReg.style.display = 'block';
      popupRegValidator.setButtonDisable();
    });
});
popupForwardSuccess.addEventListener('click', () => {
  popupSuccess.close();
  popupEnt.open();
});

closePopupSuccess.addEventListener('click', () => {
  popupSuccess.close();
});

popupButtonEntry.addEventListener('click', () => {
  api.authorization(inputEmailEnt.value, inputPassEnt.value)
    .then((data) => {
      localStorage.setItem('token', data.token);
      popupEnt.close();
      headerReg.close();
      headerAuth.open();
    })
    .catch(() => {
      popupErrorEnt.style.display = 'block';
      popupEntValidator.setButtonDisable();
    });
});

userName.addEventListener('click', () => {
  localStorage.removeItem('token');
  headerAuth.close();
  headerReg.openHeader();
});

api.getUserData()
  .then((res) => {
    if (res.name != null) {
      headerReg.close();
      headerAuth.open();
    } else {
      headerAuth.close();
      headerReg.openHeader();
    }
  });
