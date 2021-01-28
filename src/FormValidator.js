export default class InputsValidator {
  constructor(form, button) {
    this.form = form;
    this.button = button;
  }

  setButtonDisable() {
    this.button.className = 'popup__button-disable';
    this.button.setAttribute('disabled', true);
  }

  setButtonActive() {
    this.button.className = 'popup__button';
    this.button.removeAttribute('disabled', true);
  }

  checkInputValid() {
    const inputs = [...this.form.querySelectorAll('input')];
    if (inputs.every((input) => input.validity.valid) === false) {
      this.setButtonDisable();
    } else {
      this.setButtonActive();
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      this.checkInputValid();
    });
  }
}
