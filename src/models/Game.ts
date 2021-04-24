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

export enum GamePhase {
    DECK_PHASE,
    PILE_PHASE
}

export enum GameEvent {
    PLAY,
    TAKE,
    CLEAR
}

export default class Game {
    gamemode : GameMode;
    players: Hand[];
    gameDeck: Deck;
    gamePile: Pile;
    currentPhase: GamePhase;
    currentPlayer: number;
    currentEvent: GameEvent;

    constructor(gamemode: GameMode){
        this.gamemode = gamemode;
        this.gameDeck = new Deck();
        this.gamePile = new Pile();
        this.currentPhase = GamePhase.DECK_PHASE;
        this.currentPlayer = 0;
        this.currentEvent = GameEvent.PLAY;
        this.gameDeck.createDeck();
        this.gameDeck.shuffle();
        this.players = _.range(gamemode).map(() =>{
            const playerCards : Card[] = [];

            //loop 9 vezes
            _.range(9).forEach(() => {
                playerCards.push(this.gameDeck.deal()!);
            });

            //add 9 cartas para um jogador
            return new Hand(playerCards);
        });
    }

    getPlayerCard(playerIndex : number, cardIndex : number) {
        return this.players[playerIndex].current[cardIndex];
    }

    turn(playerIndex : number, cardIndex : number){

        const player = this.players[playerIndex];

        if(playerIndex !== this.currentPlayer){
            throw new Error('Wrong player! The current player is: Player '+(this.currentPlayer + 1));
        }

        const move = this.gamePile.addCard(player.play(cardIndex));
        console.log({move});

        if(move === null){
            this.currentEvent = GameEvent.PLAY;
        } else if(move === 'Clear'){
            this.currentEvent = GameEvent.CLEAR;
        } else {
            this.currentEvent = GameEvent.TAKE;
            player.take(move);
        }

        if(this.currentPhase === GamePhase.DECK_PHASE && player.current.length < 3){
            while(player.current.length !== 3 && !this.gameDeck.isEmpty()){
                player.take([this.gameDeck.deal()!]);
            }
        }

        if(this.gameDeck.isEmpty()){
            this.currentPhase = GamePhase.PILE_PHASE;
        }
    }
}