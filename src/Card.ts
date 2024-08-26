export class Card {
  #value: string;
  #element: HTMLElement;
  #revealed: boolean;

  constructor(value: string) {
    this.#value = value;
    this.#element = document.createElement('button');
    this.#element.className = 'card';
    this.#revealed = false;
  }

  get value(): string {
    return this.#value;
  }

  get element(): HTMLElement {
    return this.#element;
  }

  get revealed(): boolean {
    return this.#revealed;
  }

  reveal(): void {
    this.#element.setAttribute('revealed', 'true');
    this.#revealed = true;
  }

  hide(): void {
    this.#element.setAttribute('revealed', 'false');
    this.#revealed = false;
  }
}
