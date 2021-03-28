import Deck, { Card } from "./Deck";

class Pile extends Deck {

    //caso 5 seja a primeira carta, prevenir reflexao
    public top(): Card {
        const top = this.deck[this.deck.length - 1];
        return top?.value !== '5' ? top : this.deck[this.deck.length - 2];
    }

    public addCard(card: Card) {
        if (this.top()) {
            const { value } = card;
            switch (value) {
                case '2':
                case '5':
                    this.deck.push(card);
                    return null;
                case '3':
                case '4':
                case '6':
                case '7':
                case '8':
                case '9':
                case 'J':
                case 'Q':
                case 'K':
                case 'A':
                    if ((this.top()?.value === '7' && Deck.priority(card) <= Deck.priority(this.top())) || Deck.priority(card) >= Deck.priority(this.top())) {
                        this.deck.push(card);
                    } else {
                        return null;
                        //return this.clear();
                    }
                    break;
                case '10':
                    this.clear();
                    return null;
                default:
                    return null;

            }
        } else {
            this.deck.push(card);
            return null;
        }
    }
}

export default Pile;