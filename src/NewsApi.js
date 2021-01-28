export default class NewsApi {
  constructor(settings) {
    this.settings = settings;
  }

  getNewsApi(keyword, from, to) {
    return fetch(`${this.settings}everything?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=c1cc42798ee94f41b7243d5166f9f163`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }
}
