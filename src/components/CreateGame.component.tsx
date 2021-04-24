import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { PlayerContext } from "../context/context";
import "../css/App.css";

interface GameScreenProps {
    didRedirect(): void;
    setUserName(name: string): void;
    setGamemode(playersAmount: number): void;
}
interface CreateGameProps {
    setUserName(name: string): void;
    setGamemode(playersAmount: number): void;
}

const GameScreen: React.FC<GameScreenProps> = (props) => {
    const [didGetUserName, setDidGetUserName] = useState(false);
    const [selectedGameMode, setSelectedGameMode] = useState(3);
    const [gameId, setGameId] = useState("");
    const [inputName, setInputName] = useState("");

    const send = () => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier.
         */
        const newGameRoomId = uuid();

        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later.
        setGameId(newGameRoomId);
    };

    return (
        <>
            {didGetUserName ? (
                <Redirect to={"/game/" + gameId}>
                    <button
                        className='btn btn-success'
                        style={{
                            marginLeft:
                                String(window.innerWidth / 2 - 60) + "px",
                            width: "120px",
                        }}
                    >
                        Start Game
                    </button>
                </Redirect>
            ) : (
                <div className='input-box'>
                    <h1>Your Username:</h1>

                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInputName(e.target.value)
                        }
                    />

                   <input type='range' min={2} max={5} value={selectedGameMode} onChange={e => setSelectedGameMode(Number(e.target.value))} />
                   <label>Amount of players: {selectedGameMode}</label>

                    <button
                        className='btn btn-primary'
                        disabled={!(inputName.length > 0)}
                        onClick={() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            props.didRedirect();
                            props.setUserName(inputName);
                            props.setGamemode(selectedGameMode);
                            setDidGetUserName(true);
                            send();
                        }}
                    >
                        Submit
                    </button>
                </div>
            )}
        </>
    );
};

const CreateGame: React.FC<CreateGameProps> = (props) => {
    const player = React.useContext(PlayerContext);

    return (
        <GameScreen
            didRedirect={player.playerDidRedirect}
            setUserName={props.setUserName}
            setGamemode={props.setGamemode}
            />
    );
};

export default CreateGame;
