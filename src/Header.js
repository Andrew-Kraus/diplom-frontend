export default class Header {
  constructor(header, api, userName) {
    this.header = header;
    this.api = api;
    this.userName = userName;
  }

  open = () => {
    this.api.getUserData()
    .then((data) => {
      this.userName.textContent = data.name;
      this.header.classList.remove('header-is-closed');
      this.header.classList.add('header-is-opened');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  openHeader = () => {
    this.header.classList.remove('header-is-closed');
    this.header.classList.add('header-is-opened');
  }

  close = () => {
    this.userName.textContent = '';
    this.header.classList.remove('header-is-opened');
    this.header.classList.add('header-is-closed');
  }
}
