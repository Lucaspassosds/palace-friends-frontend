import Deck, { Card } from "./Deck";

class Pile extends Deck {
    //caso 5 seja a primeira carta, prevenir reflexao
    public top(): Card {
        const top = this.deck[this.deck.length - 1];
        return top?.value !== "5" || !this.deck[this.deck.length - 2]
            ? top
            : this.deck[this.deck.length - 2];
    }

    public addCard(card: Card) {
        const { value } = card;
        if (this.top()) {
            switch (value) {
                case "2":
                case "5":
                    this.deck.push(card);
                    return null;
                case "3":
                case "4":
                case "6":
                case "7":
                case "8":
                case "9":
                case "J":
                case "Q":
                case "K":
                case "A":
                    if (
                        (this.top()?.value === "7" &&
                            Deck.priority(card)! <=
                            Deck.priority(this.top())!) ||
                        (this.top()?.value !== "7" &&
                            Deck.priority(card)! >= Deck.priority(this.top())!)
                    ) {
                        this.deck.push(card);
                        return null;
                    }
                    this.deck.push(card);
                    return this.clear();
                case "10":
                    this.clear();
                    return 'Clear';
                default:
                    return null;
            }
        } else if (value === '10') {
            this.clear();
            return 'Clear';
        } else {
            this.deck.push(card);
            return null;
        }
    }
}

export default Pile;
