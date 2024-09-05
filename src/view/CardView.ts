import { Card } from '../refactored/Card';

class CardView {
  #card: Card;
  #element: HTMLElement | null;

  constructor(card: Card) {
    this.#card = card;
    this.#element = null;
  }
}
