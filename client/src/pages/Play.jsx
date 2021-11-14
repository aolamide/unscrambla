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
import ReplayWaiting from '../components/ReplayWaiting/ReplayWaiting';
import {Howl, Howler} from 'howler';

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
  const [replayWaiting, setReplayWaiting] = useState(false);
  const [results, setResults] = useState(null);
  const [params] = useSearchParams();
  const [playerDisconnected, setPlayerDisconnected] = useState(false);
  const socket = useContext(ConnectionContext);
  const navigate = useNavigate();

  Howler.volume(0.02);
  const playSound = () => {
    const sound = new Howl({
      src: ['/start.mp3']
    });
    
    sound.play();
  }

  const replayGame = () => {
    socket.emit('replay', gameCode);
    setReplayWaiting(true);
    setGameEnded(false)
  };

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
          navigate(`/?gameError=${msg}`)
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
      playSound();
    });

    socket.on('gameEnded', result => {
      if(result) {
        setResults(result);
      }
      setGameStarted(false);
      setGameEnded(true);
    });
    
    socket.on('playerDisconnected', () => {
      setGamePreparing(false);
      setPlayerDisconnected(true);
    });

    socket.on('disconnect', () => {
      navigate(`/?gameError=You were disconnected`);
    });

    return (() => {
      socket.off('checkCodeResult');
      socket.off('gameCreated');
      socket.off('gameReady');
      socket.off('gameStarted');
      socket.off('gameEnded');
      socket.off('playerDisconnected');
      socket.off('disconnect')
    })
  }, []);

  useEffect(() => {
    socket.on('gameReady', ({ host, playerTwo }) => {
      setName(isHost ? host : playerTwo);
      setPlayerTwoName(isHost ? playerTwo : host);
      setReplayWaiting(false);
      
      setHostWaiting(false);
      setGamePreparing(true);

      playSound();
    });
    return (() => {
      socket.off('gameReady');
    })
  }, [isHost]);

  if(loading) return <Loading />
  if(hostWaiting) return showLayout(<HostWaiting code={gameCode} />);
  if(gamePreparing) return showLayout(<GamePreparing name={name} opponentName={playerTwoName} />)
  if(gameStarted) return <Game name={name} opponentName={playerTwoName} gameCode={gameCode} host={isHost} />
  if(gameEnded) return showLayout(<Result onReplay={replayGame} results={results} host={isHost} name={name} opponentName={playerTwoName} disconnect={playerDisconnected} />)
  if(replayWaiting) return showLayout(<ReplayWaiting />)
  return showLayout(<NameForm host={isHost} gameCode={gameCode} />);
}

export default Play;