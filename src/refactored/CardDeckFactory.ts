class DeckFactory {
  createDeck(
    rowLength: number,
    columnLength: number,
    potentialCards: string[]
  ): string[] {
    const numOfCards = rowLength * columnLength;
    const deck: string[] = [];
    for (let i = 0; i < numOfCards / 2; i++) {
      const index = Math.floor(Math.random() * potentialCards.length);
      const cardValue = potentialCards[index];
      deck.push(cardValue);
      deck.push(cardValue);
      potentialCards.splice(index, 1);
    }
    return this.#shuffleCards(deck);
  }

  #shuffleCards(deck: string[]): string[] {
    const shuffledDeck: string[] = deck.slice();

    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    return shuffledDeck;
  }
}
