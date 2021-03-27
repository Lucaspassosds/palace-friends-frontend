type Card = {
    suit: string,
    value: string,
}

class Deck {
    deck: Card[];
    constructor(){
        this.deck = [];
    }

    createDeck(){
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        for(let suit of suits){
            for(let value of values){
                this.deck.push({suit, value});
            }
        }
        return this.deck;
    }

    shuffle(){
        this.deck = this.deck.sort(() => Math.random() - 0.5);
        return this.deck;
    }

    deal(){
        return this.deck.pop();
    }

    addCard(card : Card) {
        this.deck.push(card);
    }
    
}

export default Deck;