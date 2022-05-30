export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  constructor() {
    this.#assignEl();
    this.#addEvent();
  }

  #assignEl() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", (e) => {
      if (this.#keyboardEl.querySelector(`[data-code=${e.code}]`)) {
        this.#keyboardEl
          .querySelector(`[data-code=${e.code}]`)
          .classList.add("active");
      }
    });
    document.addEventListener("keyup", (e) => {
      if (this.#keyboardEl.querySelector(`[data-code=${e.code}]`)) {
        this.#keyboardEl
          .querySelector(`[data-code=${e.code}]`)
          .classList.remove("active");
      }
    });
  }

  #onChangeTheme(e) {
    document.documentElement.setAttribute(
      "theme",
      e.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(e) {
    document.body.style.fontFamily = e.target.value;
  }
}
