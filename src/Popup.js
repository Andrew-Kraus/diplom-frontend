export default class Popup {
  constructor(popup) {
    this.popup = popup;
  }

  open() {
    this.popup.classList.add('popup-is-opened');
  }

  close() {
    this.popup.classList.remove('popup-is-opened');
  }
}
