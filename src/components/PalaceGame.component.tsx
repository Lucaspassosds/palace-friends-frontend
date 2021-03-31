import React, { useState } from "react";
import Game, { GameMode } from "../models/Game";
import { Card } from "../models/Deck";
import requireImage from "../utils/imageImportHelper";

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
    //console.log(game);

    const generatePlayerCards = () => {
        return game.players.map((player, index) => {
            return (
                <div key={index}>
                    <h1>Player {index + 1} cards</h1>
                    {player.current.map((card, cardIndex) => {
                        const bg = requireImage(`${card.suit}_${card.value}`);

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

    const selectCard = (
        playerIndex: number,
        cardIndex: number,
        imageUrl: string
    ) => {
        //if player da vez
        //if cartas validas serem jogadas juntas

        //caso a carta ja tenha sido selecionada
        if (selectedCards.some((value) => value.cardIndex === cardIndex)) {
            //caso a carta ja tenha sido, remover a carta
            setSelectedCards(
                selectedCards.filter((value) => value.cardIndex !== cardIndex)
            );
        } else {
            //caso ainda nao tenha sido, adiciona
            setSelectedCards([
                ...selectedCards,
                { playerIndex, cardIndex, imageUrl },
            ]);
        }
    };

    const play = () => {
        selectedCards.forEach((card, index) => {
            /**
             * chama metodo de Game que vai:
             * 1. remover a carta do baralho do jogador que a jogou.
             * 2. jogar a carta no jogo(aplicando as logicas necessarias)
             */
            game.turn(card.playerIndex, card.cardIndex);
        });
        setSelectedCards([]);
    };

    const generatePileCards = () => {
        return game.gamePile.deck.map((card, index) => {
            const imgUrl = requireImage(`${card.suit}_${card.value}`);
            return (
                <img
                    src={imgUrl}
                    alt='Oops! :('
                    className='player-card'
                    key={index}
                    style={{
                        position: "relative",
                        zIndex: index + 1,
                        marginLeft: "-4.25vh",
                    }}
                />
            );
        });
    };

    return (
        <div className='container game-container'>
            <div id='game-table'>
                {generatePlayerCards()}
                <div id='pile'>{generatePileCards()}</div>
                <button
                    className='btn btn-primary play-btn'
                    onClick={() => play()}
                >
                    PLAY
                </button>
            </div>
        </div>
    );
};

export default PalaceGame;
