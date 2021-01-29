import {
  cardsArray, results, resultNotFound, showMoreButton, count, finderInput, finderButton,
} from './const/const';

export default class SearchNews {
  constructor(newsApi, cardList) {
    this.newsApi = newsApi;
    this.cardList = cardList;
  }

  removeAttribute = () => {
    finderButton.removeAttribute('disabled');
    finderInput.removeAttribute('disabled');
  }

  setAttribute = () => {
    finderButton.setAttribute('disabled', true);
    finderInput.setAttribute('disabled', true);
  }

  getNews = event => {
    event.preventDefault();

    results.classList.add('results-is-opened');
    this.preloader(true);
    this.newsApi.getNewsApi(finderInput.value)
      .then((data) => {
        resultNotFound.style.display = 'none';
        this.removeAttribute();
        this.cardList.clear();
        data.articles.forEach((res) => {
          cardsArray.push(res);
        });
        if (cardsArray.length !== 0) {
          const lineArticles = cardsArray.slice(0, count);
          this.cardList.renderStatus(lineArticles);
          if (cardsArray.length > 3) {
            showMoreButton.classList.add('results-is-opened');
          } else {
            showMoreButton.classList.remove('results-is-opened');
          }
          cardsArray.keyword = finderInput.value;
        } else if (cardsArray.length == 0) {
          resultNotFound.style.display = 'flex';
          showMoreButton.classList.remove('results-is-opened');
        }
      })
      .catch(() => {
        this.removeAttribute();
        return alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })

      .finally(() => {
        this.preloader(false);
      });

  }

  preloader = isLoading => {
    this.spinner = document.querySelector('.preloader');

    isLoading
      ? this.spinner.style.display = 'block'
      : this.spinner.style.display = 'none';
  }
}
