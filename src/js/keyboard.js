export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  constructor() {
    this.#assignEl();
    this.#addEvent();
  }

  #assignEl() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeydown.bind(this));
    document.addEventListener("keyup", this.#onKeyup.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput.bind(this));
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown);
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseDown(e) {
    e.target.closest("div.key")?.classList.add("active");
  }

  #onMouseUp(e) {
    const keyEl = e.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset;

    if (
      isActive &&
      !!val.val &&
      val.val !== "Space" &&
      val.val !== "Backspace"
    ) {
      this.#inputEl.value += val.val;
    }

    if (isActive && val.val === "Space") {
      this.#inputEl.value += " ";
    }

    if (isActive && val.val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }

    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onKeyup(e) {
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.remove("active");
  }

  #onKeydown(e) {
    this.#inputGroupEl.classList.toggle("error", e.key === "Process");

    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.add("active");
  }

  #onInput() {
    this.#inputEl.value = this.#inputEl.value.replace(
      /[???-???|???-???|???-???]/,
      ""
    );
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
