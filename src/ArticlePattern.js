import { setDate, objStatus, imageNull } from "./const/const"

export default class ArticlePattern {
  constructor(api, cardsArray) {
    this.api = api;
    this.cardsArray = cardsArray;
  }

  templateCreate = (obj, status) => {
    if (status === objStatus.statusNoLogin) {
      return `
        <div class="results__card">
          <div class="results__image" style="background-image: url(${this.handlingHtml(this.imgIsNull(obj))})">
            <div class="results__buttons">
              <span class="results__auth results__auth-closed">Войдите, чтобы сохранять статьи</span>
              <button class="results__icon"></button>
            </div>
          </div>
            <a href="${this.handlingHtml(obj.url)}" class="results__container-text" target="_blank">
              <p class="results__date gray-text">${this.handlingHtml(setDate(obj.publishedAt))}</p>
              <h2 class="results__subtitle">${this.handlingHtml(obj.title)}</h2>
              <p class="results__text">${this.handlingHtml(obj.description)}</p>
              <p class="results__source gray-text">${this.handlingHtml(obj.source.name)}</p>
            </a>
        </div>
      `
    } else if (status === objStatus.statusLogin) {
      return `
        <div class="results__card">
          <div class="results__image" style="background-image: url(${this.handlingHtml(this.imgIsNull(obj))})">
          </div>
          <button class="results__icon"></button>
            <a href="${this.handlingHtml(obj.url)}" class="results__container-text" target="_blank">
              <p class="results__date gray-text">${this.handlingHtml(setDate(obj.publishedAt))}</p>
              <h2 class="results__subtitle">${this.handlingHtml(obj.title)}</h2>
              <p class="results__text">${this.handlingHtml(obj.description)}</p>
              <p class="results__source gray-text">${this.handlingHtml(obj.source.name)}</p>
            </a>
        </div>
      `
    } else if (status === objStatus.statusCardSave) {
      return `
        <div class="results__card" id="${obj._id}">
          <div class="results__image" style="background-image: url(${this.handlingHtml(obj.image)})">
          <button class="results__icon results__icon-save"></button>
          <span class="articles__theme">${this.handlingHtml(obj.keyword)}</span>
          </div>
            <a href="${this.handlingHtml(obj.link)}" class="results__container-text" target="_blank">
              <p class="results__date gray-text">${this.handlingHtml(obj.date)}</p>
              <h2 class="results__subtitle">${this.handlingHtml(obj.title)}</h2>
              <p class="results__text">${this.handlingHtml(obj.text)}</p>
              <p class="results__source gray-text">${this.handlingHtml(obj.source)}</p>
            </a>
        </div>
      `
    }
  }

  handlingHtml = str => {
    const template = document.createElement('div');
    template.textContent = str;
    return template.firstChild.nodeValue;
  }

  imgIsNull = obj => {
    return obj.urlToImage === null ? imageNull : obj.urlToImage;
  }

  getArticlePattern = event => {
    const card = event.target.closest('.results__card');
    return {
      keyword: this.cardsArray.keyword,
      image: card.querySelector('.results__image').style.backgroundImage.slice(5, -2),
      date: card.querySelector('.results__date').textContent,
      title: card.querySelector('.results__subtitle').textContent,
      text: card.querySelector('.results__text').textContent,
      source: card.querySelector('.results__source').textContent,
      link: card.querySelector('.results__container-text').href,
    }
  }


  articleHandler = event => {
    const button = event.target.closest('.results__icon');
    const card = event.target.closest('.results__card')

    if (event.target.classList.contains('results__icon') && !event.target.classList.contains('results__icon-save')) {
      const obj = this.getArticlePattern(event);
      this.api.createArticle(obj)
        .then((data) => {
          card.setAttribute('id', data.data._id)
          button.classList.add('results__icon-save');
        }).catch((err) => {
        console.log(err);
      })
    } else if (event.target.classList.contains('results__icon-save')) {
      this.api.removeArticle(card.id)
        .then(() => {
          button.classList.remove('results__icon-save');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  deleteArticle = (event) => {
    const card = event.target.closest('.results__card')
    if (event.target.classList.contains('results__icon-save')) {
        this.api.removeArticle(card.id)
          .then(() => {
            card.remove();
          })
          .catch((err) => {
            console.log(err);
          })
    }
  }
}