import { Stopwatch } from './Stopwatch';

const potentialCards: string[] = [
  '🦫',
  '🐶',
  '🐱',
  '🐔',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🦆',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🦔',
  '🐸',
  '🐵',
];

export class Game {
  #rowLength: number;
  #columnLength: number;
  #cards: string[][];
  #revealedCards: number;
  #currentRevealedCard: HTMLElement | null;
  #gameOver: boolean;
  #cardsRevealed: boolean;
  #stopwatch: Stopwatch;

  constructor(rowLength: number, columnLength: number, stopwatch: Stopwatch) {
    if ((rowLength * columnLength) % 2 !== 0) {
      throw new Error('The number of cards must be even');
    }
    this.#rowLength = rowLength;
    this.#columnLength = columnLength;
    this.#cards = [];
    this.#revealedCards = 0;
    this.#currentRevealedCard = null;
    this.#gameOver = false;
    this.#cardsRevealed = false;
    this.#stopwatch = stopwatch;
    this.#initializeTable();
    this.#stopwatch.start();
  }

  #initializeTable(): void {
    const potentialCardsArray: string[] = this.#choosePotentialCards();

    const table: HTMLElement = document.createElement('div');
    table.className = 'table';

    this.#createRows(potentialCardsArray, table);

    document.body.appendChild(table);
  }

  #createRows(potentialCardsArray: string[], table: HTMLElement): void {
    for (let rowIndex = 0; rowIndex < this.#columnLength; rowIndex++) {
      this.#cards[rowIndex] = [];

      const row = document.createElement('div');
      row.className = 'row';

      this.#createCardsForRow(potentialCardsArray, rowIndex, row);
      table.appendChild(row);
    }
  }

  #createCardsForRow(
    potentialCardsArray: string[],
    rowIndex: number,
    row: HTMLElement
  ): void {
    for (let columnIndex = 0; columnIndex < this.#rowLength; columnIndex++) {
      const randomCard = this.#chooseRandomCard(potentialCardsArray);
      this.#cards[rowIndex][columnIndex] = randomCard;
      const card = this.#createCard(rowIndex, columnIndex);
      row.appendChild(card);
    }
  }

  #createCard(rowIndex: number, columnIndex: number): HTMLElement {
    const card = document.createElement('button');
    card.className = 'card';
    card.id = `${rowIndex}-${columnIndex}`;
    card.setAttribute('revealed', 'false');
    card.onclick = () => {
      this.#revealCard(rowIndex, columnIndex);
    };
    return card;
  }

  #chooseRandomCard(potentialCardsArray: string[]): string {
    const index = Math.floor(Math.random() * potentialCardsArray.length);
    const randomCard = potentialCardsArray[index];
    potentialCardsArray.splice(index, 1);
    return randomCard;
  }

  #choosePotentialCards(): string[] {
    const potentialcardsArray: string[] = [];
    for (let i = 0; i < (this.#rowLength * this.#columnLength) / 2; i++) {
      potentialcardsArray.push(potentialCards[i]);
      potentialcardsArray.push(potentialCards[i]);
    }
    return potentialcardsArray;
  }

  #checkWin(): boolean {
    this.#gameOver =
      this.#columnLength * this.#rowLength === this.#revealedCards;

    return this.#gameOver;
  }

  #doCardsMatch(card1: HTMLElement, card2: HTMLElement): boolean {
    return card1 !== card2 && card1.innerText === card2.innerText;
  }

  #revealCard(row: number, column: number): void {
    const cardToReveal: HTMLElement | null = document.getElementById(
      `${row}-${column}`
    );

    if (
      !cardToReveal ||
      cardToReveal.getAttribute('revealed') === 'true' ||
      this.#cardsRevealed
    )
      return;

    cardToReveal.setAttribute('revealed', 'true');
    cardToReveal.innerText = this.#cards[row][column];

    if (this.#currentRevealedCard === null) {
      this.#currentRevealedCard = cardToReveal;
    } else {
      const firstCard = this.#currentRevealedCard;
      this.#currentRevealedCard = null;
      this.#cardsRevealed = true;
      if (this.#doCardsMatch(firstCard, cardToReveal)) {
        this.#cardsRevealed = false;
        this.#revealedCards += 2;
        !this.#gameOver &&
          this.#checkWin() &&
          setTimeout(() => {
            this.#stopwatch.stop();
            alert('Nyomod Dorka <33');
          }, 200);
      } else {
        setTimeout(() => {
          firstCard.innerText = '';
          firstCard.setAttribute('revealed', 'false');
          cardToReveal.innerText = '';
          cardToReveal.setAttribute('revealed', 'false');
          this.#cardsRevealed = false;
        }, 1000);
      }
    }
  }

  public printTable(): void {
    console.log(this.#cards);
  }
}
