import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import { PlayerContext } from './context/context';
import CreateGame from './components/CreateGame.component';
import PalaceGame from './components/PalaceGame.component';
import { GameMode } from './models/Game';

function App() {

  const [didRedirect, setDidRedirect] = React.useState(false)

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])

  const [userName, setUserName] = React.useState('');
  const [gamemode, setGamemode] = React.useState(3);

  return (
    <PlayerContext.Provider value={{ didRedirect, playerDidRedirect, playerDidNotRedirect }}>
      <Router>
        <div className="App">
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark justify-content-center col-md-12'>
            <Link to={"/"} className='navbar-brand'>
              <p className="main-text">Palace</p>
            </Link>
          </nav>
        </div>
        <Switch>
          <Route exact path="/">
            <CreateGame setUserName={setUserName} setGamemode={setGamemode} />
          </Route>
          <Route exact path="/game/:gameid">
            <PalaceGame myUserName={userName} gamemode={gamemode} />
          </Route>
        </Switch>
      </Router>
    </PlayerContext.Provider >
  );
}

export default App;
