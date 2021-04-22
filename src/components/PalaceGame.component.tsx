import React, { useState } from "react";
import Game, { GameMode, GameEvent } from "../models/Game";
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
    let gridTemplate;
    switch (props.gamemode) {
        case GameMode.TWO_PLAYERS:
            gridTemplate = `'. player-2 .'
                            '. game .'
                            '. player-1 .'`;
            break;
        case GameMode.THREE_PLAYERS:
            gridTemplate = `'player-2 . player-3'
                            '. game .'
                            '. player-1 .'`;
            break;
        case GameMode.FOUR_PLAYERS:
            gridTemplate = `'. player-2 .'
                            'player-3 game player-4'
                            '. player-1 .'`;
            break;
        case GameMode.FIVE_PLAYERS:
            gridTemplate = `'player-2 . player-3'
                            '. game .'
                            'player-4 player-1 player-5'`;
            break;
    }

    const generatePlayerCards = () => {
        return game.players.map((player, index) => {
            return (
                <div key={index} style={{ gridArea: "player-" + (index + 1) }}>
                    <h1>Player {index + 1} cards</h1>
                    {player.current.map((card, cardIndex) => {
                        const bg = requireImage(`${card.suit}_${card.value}`);

                        return (
                            <img
                                key={cardIndex}
                                className='player-card'
                                src={bg}
                                alt='card!'
                                onClick={(e) => {
                                    selectCard(index, cardIndex, bg, e);
                                }}
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
        imageUrl: string,
        event: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        //if player da vez
        if(playerIndex !== game.currentPlayer){
            return;
        }

        //if cartas nao podem ser jogadas juntas(cartas nao sao de mesmo valor)
        if (
            !selectedCards.every(
                (value) =>
                    game.getPlayerCard(value.playerIndex, value.cardIndex)
                        .value ===
                    game.getPlayerCard(playerIndex, cardIndex).value
            )
        ) {
            return;
        }

        focusSelected(event);
        if (selectedCards.some((value) => value.cardIndex === cardIndex)) {
            //caso a carta ja tenha sido selecionada
            //caso a carta ja tenha sido, remover a carta
            return setSelectedCards(
                selectedCards.filter((value) => value.cardIndex !== cardIndex)
            );
        }
        //caso ainda nao tenha sido, adiciona
        setSelectedCards([
            ...selectedCards,
            { playerIndex, cardIndex, imageUrl },
        ]);
    };

    //yellow border on selected card / borda amarela na carta
    const focusSelected = ({
        currentTarget,
    }: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
        currentTarget.classList.contains("card-selected")
            ? currentTarget.classList.remove("card-selected")
            : currentTarget.classList.add("card-selected");

    //remove todas bordas amarelas / remove all focus from cards
    const removeCardFocus = () => {
        const focusedCards = document.querySelectorAll(".card-selected");

        focusedCards.forEach((card) => card.classList.remove("card-selected"));
    };

    const play = () => {
        playCards();
        setSelectedCards([]);
        removeCardFocus();
    };

    const playCards = () => {
        for (const value of selectedCards.slice().reverse()) {
            /**
             * chama metodo de Game que vai:
             * 1. remover a carta do baralho do jogador que a jogou.
             * 2. jogar a carta no jogo(aplicando as logicas necessarias)
             */
            if (value.playerIndex !== game.currentPlayer) {
                alert(
                    `Player ${
                        value.playerIndex + 1
                    }, you can't play right now! Current player is: Player ${
                        game.currentPlayer + 1
                    }`
                );
                return;
            }
            game.turn(value.playerIndex, value.cardIndex);
        }

        /*
         * Se a pilha se limpou, o jogador podera jogar denovo.
         * Se o jogador puxou a pilha, a vez passa para o anterior.
         * Caso contrario, a vez passa para o proximo jogador.
         */
        switch(game.currentEvent){
            case GameEvent.PLAY: 
            game.currentPlayer =
                ((++game.currentPlayer % game.gamemode) + game.gamemode) %
                game.gamemode;
                break;
            case GameEvent.TAKE:
                game.currentPlayer =
                ((--game.currentPlayer % game.gamemode) + game.gamemode) %
                game.gamemode;
                break;
        }
        
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
        <div
            className='container game-container'
            style={{ gridTemplateAreas: gridTemplate }}
        >
            {generatePlayerCards()}
            <div id='game-table'>
                <h1>Current Player: {(game.currentPlayer + 1)}</h1>
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
