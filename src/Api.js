export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUserData = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include',
    })
      .then((res) => this.getResponseData(res))
      .catch((err) => {
        throw err;
      })
  }

  getArticles = () => {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((res) => this.getResponseData(res));
  }

  createUser(elementName, elementEmail, elementPass) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: elementName,
        email: elementEmail,
        password: elementPass,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  authorization(elementEmail, elementPass) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: elementEmail,
        password: elementPass,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  createArticle = obj => {
    return fetch(`${this.baseUrl}/articles`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        keyword: obj.keyword,
        title: obj.title,
        text: obj.text,
        date: obj.date,
        source: obj.source,
        link: obj.link,
        image: obj.image,
      }),
    })
      .then((res) => this.getResponseData(res));
  }

  removeArticle = articleId => {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((res) => this.getResponseData(res));
  }

  getResponseData = res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
