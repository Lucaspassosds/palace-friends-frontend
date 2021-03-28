export type Card = {
    suit: string,
    value: string,
}

export default class Deck {
    private _deck: Card[];

    constructor() {
        this._deck = [];
    }

    public createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        for (let suit of suits) {
            for (let value of values) {
                this._deck.push({ suit, value });
            }
        }
        return this._deck;
    }

    public shuffle() {
        do {
            this._deck = this._deck.sort(() => Math.random() - 0.5);
        } while (this.top().value !== '10');
        return this._deck;
    }

    public deal() {
        return this._deck.pop();
    }

    public addCard(card: Card) {
        this._deck.push(card);
    }

    public clear() {
        const deck = this._deck;
        this._deck = [];
        return deck;
    }

    public top() {
        return this._deck[this._deck.length - 1];
    }

    public static priority(card: Card) {
        return card ? {
            '2': 0,
            '3': 1,
            '4': 2,
            '5': 3,
            '6': 4,
            '7': 5,
            '8': 6,
            '9': 7,
            '10': 99,
            'J': 8,
            'Q': 9,
            'K': 10,
            'A': 11,
        }[card.value] : -1;
    }

    public get deck() {
        return this._deck;
    }

    public set deck(deck: Card[]) {
        this._deck = deck;
    }

}
