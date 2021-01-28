import './index.css';
import Api from './Api';
import ArticlePattern from './ArticlePattern';
import NewsArray from './NewsArray';
import SavedArticles from './SavedArticles';
import Header from './Header';

import {
  cardsArray,
  userName,
  headerR,
  headerA,
  count,
  userHeader,
  API_URL,
  cardsGrid,
  articlesSection,
} from './const/const';

const api = new Api(API_URL);
const article = new ArticlePattern(api, cardsArray);
const cardList = new NewsArray(cardsGrid, cardsArray, count, article, api, userName);
const savedArticles = new SavedArticles();
const headerReg = new Header(headerR, api, userHeader);
const headerAuth = new Header(headerA, api, userHeader);

async function resultSaved() {
  const resultData = await api.getArticles();
  const articles = resultData.data;
  api.getUserData()
    .then((data) => {
      savedArticles.savedArticlesData(data.name, articles);
    })
    .catch((err) => {
      console.log(err);
    });
}

api.getUserData()
  .then((data) => {
    if (data === undefined) {
      document.location.href = './';
    }
    userName.textContent = data.name;
  })
  .catch((err) => {
    console.log(err);
    document.location.href = './';
  });

userName.addEventListener('click', () => {
  localStorage.removeItem('token');
  document.location.href = './';
  headerAuth.close();
  headerReg.openHeader();
});
articlesSection.addEventListener('click', article.deleteArticle);
cardList.articleFavorites();
resultSaved();
