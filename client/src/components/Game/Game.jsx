import React, { useContext, useEffect, useState } from 'react'
import { ConnectionContext } from '../../connection'

import Timer from 'react-compound-timer';

const Game = ({ name, opponentName, gameCode, host }) => {
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [messages, setMessages] = useState([]);
  const [pick, setPick] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const socket = useContext(ConnectionContext);

  const submitWord = e => {
    e.preventDefault();
    socket.emit('playerTry', { wordPick : pick, gameCode, userId : socket.id });
    setMessages(messages => [...messages, { type : 'user', msg : pick }]);
    setPick('');
  }

  useEffect(() => {
    socket.emit('getScrambledWord', gameCode);

    socket.on('adminMessage', msg => {
      const newMsg = { type : 'admin', msg };
      setMessages(currentMessages => [...currentMessages, newMsg]);
    });
    socket.on('opponentTry', msg => {
      const newMsg = { type : 'opponent', msg };
      setMessages(currentMessages => [...currentMessages, newMsg]);
    });
    socket.on('newScrambledWord', word => {
      setScrambledWord(word);
    });
    socket.on('scoreUpdate', update => {
      if(update) {
        const { hostScore, playerTwoScore } = update;
        setScore(host ? hostScore : playerTwoScore);
        setOpponentScore(host ? playerTwoScore : hostScore);
      }
    })
    return (() => {
      socket.off('adminMessage');
      socket.off('opponentTry');
      socket.off('newScrambledWord')
    })
  }, []);

  return (
    <div>
      <p>Game is live.</p>
      <div style={{ display : 'flex', justifyContent : 'space-between' }}>
        <div>
          <p>{name}</p>
          <p>{score}</p>
        </div>
        <div>vs</div>
        <div>
          <p>{opponentName}</p>
          <p>{opponentScore}</p>
        </div>
      </div>
      <div>
        <Timer
          initialTime={1000 * 60 * 2}
          direction="backward"
        >
          <div>
            <strong>
              <Timer.Minutes /> :
              <Timer.Seconds formatValue={(value) => `${(value < 10 ? ` 0${value}` : ` ${value}`)}`} />
            </strong>
            
          </div>
        </Timer>
      </div>
      <div>
        Current word : <strong>{scrambledWord} </strong>
      </div>
      <div>
        {messages.map((message, index) => {
          if(message.type === 'admin') return <p key={index}>Admin message : {message.msg}</p>
          else if(message.type === 'user') return <p key={index}>Your message : {message.msg}</p>
          return <p key={index}>Opponent message : {message.msg}</p>
        })}
      </div>
      <form onSubmit={submitWord}>
        <input type="text" placeholder="Enter word here" value={pick} onChange={e => setPick(e.target.value)} />
      </form>
    </div>
  )
};

export default Game