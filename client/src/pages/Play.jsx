import React, { useContext, useEffect, useState } from 'react';
import { ConnectionContext } from '../connection';
import { useSearchParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading/Loading';
import HostWaiting from '../components/HostWaiting/HostWaiting';
import GamePreparing from '../components/GamePreparing/GamePreparing';
import Game from '../components/Game/Game';
import NameForm from '../components/NameForm/NameForm';
import Result from '../components/Result/Result';
import Layout from '../components/Layout/Layout';


const showLayout = component => {
  return <Layout>{component}</Layout>
}

const Play = () => {
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(true);
  const [gameCode, setGameCode] = useState('');
  const [name, setName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [hostWaiting, setHostWaiting] = useState(false);
  const [gamePreparing, setGamePreparing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [results, setResults] = useState(null);
  const [params, _] = useSearchParams();
  const socket = useContext(ConnectionContext);
  const navigate = useNavigate();

  useEffect(() => {
    let code = params.get('code');
    if(code) {
      setIsHost(false);
      socket.emit('checkCode', code);
      socket.on('checkCodeResult', ({ success, msg }) => {
        if(success) {
          setLoading(false);
          setGameCode(code);
        } 
        else {
          alert(msg);
          navigate('/');
        }
      })
    } else {
      setLoading(false);
    }
    socket.on('gameCreated', gameId => {
      setGameCode(gameId);
      setHostWaiting(true);
    });
    
    socket.on('gameStarted', () => {
      setGamePreparing(false);
      setGameStarted(true);
    });

    socket.on('gameEnded', result => {
      if(result) {
        setResults(result);
      }
      setGameStarted(false);
      setGameEnded(true);
    });

    return (() => {
      socket.off('checkCodeResult');
      socket.off('gameCreated');
      socket.off('gameReady');
      socket.off('gameStarted');
      socket.off('gameEnded');
    })
  }, []);

  useEffect(() => {
    socket.on('gameReady', ({ host, playerTwo }) => {
      setName(isHost ? host : playerTwo);
      setPlayerTwoName(isHost ? playerTwo : host);
      
      setHostWaiting(false);
      setGamePreparing(true);
    });
    return (() => {
      socket.off('gameReady');
    })
  }, [isHost]);

  if(loading) return <Loading />
  if(hostWaiting) return showLayout(<HostWaiting code={gameCode} />);
  if(gamePreparing) return showLayout(<GamePreparing name={name} opponentName={playerTwoName} />)
  if(gameStarted) return <Game name={name} opponentName={playerTwoName} gameCode={gameCode} host={isHost} />
  if(gameEnded) return showLayout(<Result results={results} host={isHost} name={name} opponentName={playerTwoName} />)
  return showLayout(<NameForm host={isHost} gameCode={gameCode} />);
}

export default Play;