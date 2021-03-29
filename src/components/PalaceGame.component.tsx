import React, { useState } from 'react';
import Game, { GameMode } from '../models/Game';
import { Stage, Layer, Image } from 'react-konva';

interface PalaceGameProps {
    gamemode: GameMode,
    myUserName: string,
}

const PalaceGame : React.FC<PalaceGameProps> = (props) => {
    const [game, setGame] = useState(new Game(props.gamemode));

    return(
        <div id="table">
            <h1>Palace!</h1>
        </div>
    );
}

export default PalaceGame;