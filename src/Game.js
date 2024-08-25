var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_instances, _Game_rowLength, _Game_columnLength, _Game_cards, _Game_revealedCards, _Game_initializeTable, _Game_checkWin;
const potentialCards = [
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
    constructor(rowLength, columnLength) {
        _Game_instances.add(this);
        _Game_rowLength.set(this, void 0);
        _Game_columnLength.set(this, void 0);
        _Game_cards.set(this, void 0);
        _Game_revealedCards.set(this, void 0);
        __classPrivateFieldSet(this, _Game_rowLength, rowLength, "f");
        __classPrivateFieldSet(this, _Game_columnLength, columnLength, "f");
        __classPrivateFieldSet(this, _Game_cards, [], "f");
        __classPrivateFieldSet(this, _Game_revealedCards, 0, "f");
        __classPrivateFieldGet(this, _Game_instances, "m", _Game_initializeTable).call(this);
    }
    doCardsMatch(row1, column1, row2, column2) {
        const match = __classPrivateFieldGet(this, _Game_cards, "f")[row1][column1] === __classPrivateFieldGet(this, _Game_cards, "f")[row2][column2];
        if (match) {
            __classPrivateFieldSet(this, _Game_revealedCards, __classPrivateFieldGet(this, _Game_revealedCards, "f") + 2, "f");
        }
        return match;
    }
    revealCard(row, column) {
        return __classPrivateFieldGet(this, _Game_cards, "f")[row][column];
    }
    printTable() {
        console.log(__classPrivateFieldGet(this, _Game_cards, "f"));
    }
}
_Game_rowLength = new WeakMap(), _Game_columnLength = new WeakMap(), _Game_cards = new WeakMap(), _Game_revealedCards = new WeakMap(), _Game_instances = new WeakSet(), _Game_initializeTable = function _Game_initializeTable() {
    let potentialcardsArray = [];
    for (let i = 0; i < (__classPrivateFieldGet(this, _Game_rowLength, "f") * __classPrivateFieldGet(this, _Game_columnLength, "f")) / 2; i++) {
        potentialcardsArray.push(potentialCards[i]);
        potentialcardsArray.push(potentialCards[i]);
    }
    const table = document.createElement('div');
    table.className = 'table';
    for (let i = 0; i < __classPrivateFieldGet(this, _Game_rowLength, "f"); i++) {
        __classPrivateFieldGet(this, _Game_cards, "f")[i] = [];
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < __classPrivateFieldGet(this, _Game_columnLength, "f"); j++) {
            const randomIndex = Math.floor(Math.random() * potentialcardsArray.length);
            __classPrivateFieldGet(this, _Game_cards, "f")[i][j] = potentialcardsArray[randomIndex];
            potentialcardsArray.splice(randomIndex, 1);
            const card = document.createElement('button');
            card.id = `${i}-${j}`;
            row.appendChild(card);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
}, _Game_checkWin = function _Game_checkWin() {
    return __classPrivateFieldGet(this, _Game_columnLength, "f") * __classPrivateFieldGet(this, _Game_rowLength, "f") === __classPrivateFieldGet(this, _Game_revealedCards, "f");
};
