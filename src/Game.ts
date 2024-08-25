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

  constructor(rowLength: number, columnLength: number) {
    if ((rowLength * columnLength) % 2 !== 0) {
      throw new Error('The number of cards must be even');
    }
    this.#rowLength = rowLength;
    this.#columnLength = columnLength;
    this.#cards = [];
    this.#revealedCards = 0;
    this.#currentRevealedCard = null;
    this.#gameOver = false;
    this.#initializeTable();
  }

  #initializeTable(): void {
    let potentialcardsArray: string[] = [];
    for (let i = 0; i < (this.#rowLength * this.#columnLength) / 2; i++) {
      potentialcardsArray.push(potentialCards[i]);
      potentialcardsArray.push(potentialCards[i]);
    }

    const table: HTMLElement = document.createElement('div');
    table.className = 'table';

    for (let i = 0; i < this.#rowLength; i++) {
      this.#cards[i] = [];
      const row: HTMLElement = document.createElement('div');
      row.className = 'row';
      for (let j = 0; j < this.#columnLength; j++) {
        const randomIndex = Math.floor(
          Math.random() * potentialcardsArray.length
        );
        this.#cards[i][j] = potentialcardsArray[randomIndex];
        potentialcardsArray.splice(randomIndex, 1);
        const card: HTMLElement = document.createElement('button');
        card.className = 'card';
        card.id = `${i}-${j}`;
        card.setAttribute('revealed', 'false');
        card.onclick = () => {
          this.revealCard(i, j);
        };
        row.appendChild(card);
      }
      table.appendChild(row);
    }
    document.body.appendChild(table);
  }

  #checkWin(): boolean {
    this.#gameOver =
      this.#columnLength * this.#rowLength === this.#revealedCards;

    return this.#gameOver;
  }

  #doCardsMatch(card1: HTMLElement, card2: HTMLElement): boolean {
    return card1 !== card2 && card1.innerText === card2.innerText;
  }

  public revealCard(row: number, column: number): void {
    const cardToReveal: HTMLElement | null = document.getElementById(
      `${row}-${column}`
    );

    if (!cardToReveal || cardToReveal.getAttribute('revealed') === 'true')
      return;

    cardToReveal.setAttribute('revealed', 'true');
    cardToReveal.innerText = this.#cards[row][column];

    if (this.#currentRevealedCard === null) {
      this.#currentRevealedCard = cardToReveal;
    } else {
      const firstCard = this.#currentRevealedCard;
      this.#currentRevealedCard = null;
      if (this.#doCardsMatch(firstCard, cardToReveal)) {
        setTimeout(() => {
          firstCard.setAttribute('found', 'true');
          cardToReveal.setAttribute('found', 'true');
          this.#revealedCards += 2;
          !this.#gameOver && this.#checkWin() && alert('You won!');
        }, 1000);
      } else {
        setTimeout(() => {
          firstCard.innerText = '';
          firstCard.setAttribute('revealed', 'false');
          cardToReveal.innerText = '';
          cardToReveal.setAttribute('revealed', 'false');
        }, 1000);
      }
    }
  }

  public printTable(): void {
    console.log(this.#cards);
  }
}
