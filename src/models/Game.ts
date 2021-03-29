import Deck, { Card } from "./Deck";
import Hand from "./Hand";
import Pile from "./Pile";
import _ from 'lodash';

export enum GameMode {
    TWO_PLAYERS = 2,
    THREE_PLAYERS = 3,
    FOUR_PLAYERS = 4,
    FIVE_PLAYERS = 5,
}

enum GamePhase {
    DECK_PHASE,
    PILE_PHASE
}

export default class Game {
    gamemode : GameMode;
    players: Hand[];
    gameDeck: Deck;
    gamePile: Pile;
    currentPhase: GamePhase;
    currentPlayer: number;

    constructor(gamemode: GameMode){
        this.gamemode = gamemode;
        this.gameDeck = new Deck();
        this.gamePile = new Pile();
        this.currentPhase = GamePhase.DECK_PHASE;
        this.currentPlayer = 0;
        this.gameDeck.createDeck();
        this.gameDeck.shuffle();
        this.players = Array<Hand>(gamemode).map(() =>{
            const playerCards : Card[] = [];

            //loop 9 vezes
            _.range(9).forEach(() => {
                playerCards.push(this.gameDeck.deal()!);
            });

            //add 9 cartas para um jogador
            return new Hand(playerCards);
        });
    }

    turn(playerIndex : number){

    }
}