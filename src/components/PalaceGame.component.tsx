import React, { useState } from "react";
import Game, { GameMode } from "../models/Game";
import { Card } from "../models/Deck";

interface PalaceGameProps {
    gamemode: GameMode;
    myUserName: string;
}
interface SelectedCardInfo {
    playerIndex: number;
    cardIndex: number;
    imageUrl: string;
}

const PalaceGame: React.FC<PalaceGameProps> = (props) => {
    const [game, setGame] = useState(new Game(props.gamemode));
    const [selectedCards, setSelectedCards] = useState<SelectedCardInfo[]>([]);

    const generateCards = () => {
        console.log(game);
        return game.players.map((player, index) => {
            return (
                <div>
                    <h1>Player {index + 1} cards</h1>
                    {player.getDeck().map((card, cardIndex) => {
                        const bg = require("../assets/img/club_1.png").default;
                        return (
                            <img
                                key={cardIndex}
                                className='player-card'
                                src={bg}
                                alt='card!'
                                onClick={() => selectCard(index, cardIndex, bg)}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    const selectCard = (playerIndex: number, cardIndex: number, imageUrl : string) => {
        //if player da vez
        //if cartas validas serem jogadas juntas
        setSelectedCards([...selectedCards, { playerIndex, cardIndex, imageUrl }]);
    };

    const play = () => {
        selectedCards.forEach((card, index) => {
            /**
             * chama metodo de Game que vai: 
             * 1. remover a carta do baralho do jogador que a jogou.
             * 2. jogar a carta no jogo(aplicando as logicas necessarias)
             * 3. adicionar imagem da carta na div de pilha
             */
            const cardImg = document.createElement('img');
            cardImg.setAttribute('src', card.imageUrl);
            cardImg.setAttribute('alt', 'Oops! :(');
            cardImg.setAttribute('class', 'player-card');
            document.getElementById('pile')?.appendChild(cardImg);
        });
        setSelectedCards([]);
    };

    return (
        <div className='container game-container'>
            <div id='game-table'>
                {generateCards()}
                <div id='pile'>PILE OF CARDS!</div>
                <button className='btn btn-primary play-btn' onClick={() => play()}>PLAY</button>
            </div>
        </div>
    );
};

export default PalaceGame;
