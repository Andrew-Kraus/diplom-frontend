import { objStatus } from './const/const';

export default class NewsArray {
  constructor(cards, cardsArray, count, article, api, user) {
    this.cards = cards;
    this.cardsArray = cardsArray;
    this.count = count;
    this.article = article;
    this.api = api;
    this.user = user;
    this.status = objStatus.statusNoLogin;
  }

  addCard = obj => {
    return this.cards.insertAdjacentHTML('beforeend', this.article.templateCreate(obj, this.status));
  }

  render = articles => {
    articles.forEach((item) => {
      this.addCard(item);
    });
  }

  renderStatus = item => {
    if (this.user.textContent === '') {
      this.status = objStatus.statusNoLogin;
      this.render(item);
    } else {
      this.status = objStatus.statusLogin;
      this.render(item);
    }
  }

  showMoreButton = button => {
    const array = this.cardsArray.slice(this.count, this.count += this.count);
    if (array.length < 3) {
      this.renderStatus(array);
      button.classList.add('header-is-opened');
    } else if (array.length == 0) {
      button.classList.remove('results-is-opened');
    } else {
      this.renderStatus(array);
    }
  }

  clear = () => {
    if (this.cardsArray.length !== 0) {
      this.cardsArray.length = 0;
      while (this.cards.firstChild) {
        this.cards.removeChild(this.cards.firstChild);
      }
    }
  }

  articleFavorites = () => {
    this.api.getArticles()
      .then((data) => {
        this.status = objStatus.statusCardSave
        data.data.forEach((item) => {
            this.cardsArray.push(item);
            console.log(data);
        });
        this.render(this.cardsArray);
      })
      .catch((err) =>
        console.log(err));
  }
}
