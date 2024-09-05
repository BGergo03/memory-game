import { MemoryGame } from './MemoryGame';

export class Card {
  #value: string;
  #revealed: boolean;
  #table: MemoryGame;

  constructor(value: string, table: MemoryGame) {
    this.#value = value;
    this.#revealed = false;
    this.#table = table;
  }

  get value(): string {
    return this.#value;
  }

  get revealed(): boolean {
    return this.#revealed;
  }

  public reveal(): void {
    this.#revealed = true;
    this.#table.onCardReveal(this);
  }

  public hide(): void {
    this.#revealed = false;
  }
}
