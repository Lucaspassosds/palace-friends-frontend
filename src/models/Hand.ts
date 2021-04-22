import { Card } from "./Deck";

export default class Hand {
        down: [Card, Card, Card];
        up: [Card, Card, Card];
        current: Card[];

        constructor(cards: Card[]){
            if(cards.length === 9){
                this.down = [cards[0], cards[1], cards[2]];
                this.up = [cards[3], cards[4], cards[5]];
                this.current = [cards[6], cards[7], cards[8]];
            } else {
                throw new Error('Hand must be initialized with 9 cards!');
            }
        }

        play(index : number) : Card{
            console.log({index});
            if(index >= 0 && index < this.current.length){
                const [ val ] = this.current.splice(index, 1);
                return val;
            } else {
                throw new Error('Index is out of bounds!');
            }
        }

        take(cards : Card[] | null | undefined){
            if(cards){
                this.current = [...this.current, ...cards];
            }
        }

        getDeck(){
            return [...this.down, ...this.up, ...this.current];
        }

}