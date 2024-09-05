import { Card } from './Card';

export class MemoryGame {
  #rowLength: number;
  #columnLength: number;
  #cards: Card[][];
  #revealedCards: number;
  #gameOver: boolean;
  #cardDeck: string[];
  #currentRevealedCard: Card | null;
  #singlePlayer: boolean;

  constructor(rowLength: number, singlePlayer: boolean, cardDeck: string[]) {
    this.#rowLength = rowLength;
    this.#columnLength = cardDeck.length / rowLength;
    this.#cards = [];
    this.#revealedCards = 0;
    this.#gameOver = false;
    this.#cardDeck = cardDeck;
    this.#currentRevealedCard = null;
    this.#singlePlayer = singlePlayer;
  }

  #isPairFound(left: Card, right: Card): boolean {
    return left !== right && left.value === right.value;
  }

  #initializeTable(rowLength: number, columnLength: number): void {
    if ((rowLength * columnLength) % 2 !== 0) {
      throw new Error('The number of cards must be even');
    }
    this.#rowLength = rowLength;
    this.#columnLength = columnLength;
    this.#cards = [];
    this.#revealedCards = 0;
    this.#gameOver = false;

    for (let i = 0; i < rowLength; i++) {
      this.#cards[i] = [];
      for (let j = 0; j < columnLength; j++) {
        const deckIndex = i * rowLength + j;
        this.#cards[i][j] = new Card(this.#cardDeck[deckIndex], this);
      }
    }
  }

  public onCardReveal(cardToReveal: Card): void {
    if (this.#currentRevealedCard === null) {
      this.#currentRevealedCard = cardToReveal;
      return;
    }

    if (this.#isPairFound(this.#currentRevealedCard, cardToReveal)) {
      this.#revealedCards += 2;
      this.#currentRevealedCard = null;
      if (this.#checkWin()) {
        console.log('You win!');
      }
      return;
    }

    setTimeout(() => {
      this.#currentRevealedCard!.hide();
      cardToReveal.hide();
      this.#currentRevealedCard = null;
    }, 1000);
  }

  #checkWin(): boolean {
    this.#gameOver =
      this.#columnLength * this.#rowLength === this.#revealedCards;

    return this.#gameOver;
  }

  public printTable(): void {
    console.log(this.#cards);
  }
}
