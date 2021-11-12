import React, { useContext, useEffect, useRef, useState } from 'react'
import { ConnectionContext } from '../../connection'

import Timer from 'react-compound-timer';
import GameScores from '../GameScores/GameScores';
import AdminMessage from '../Messages/AdminMessage';
import Message from '../Messages/Message';

const Game = ({ name, opponentName, gameCode, host }) => {
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [messages, setMessages] = useState([]);
  const [pick, setPick] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const socket = useContext(ConnectionContext);
  const messagesElement = useRef(null);

  const submitWord = e => {
    e.preventDefault();
    socket.emit('playerTry', { wordPick : pick.toLowerCase(), gameCode, userName : name });
    setMessages(messages => [...messages, { type : 'user', msg : pick }]);
    setPick('');
  }

  useEffect(() => {
    socket.emit('getScrambledWord', gameCode);

    socket.on('adminMessage', msg => {
      const newMsg = { type : 'admin', msg };
      setMessages(currentMessages => [...currentMessages, newMsg]);
      messagesElement.current.scrollTop = messagesElement.current.scrollHeight;
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
    <div className="bg-brown-light h-screen flex items-center justify-center">
      <div className="w-full sm:w-8/12 md:max-w-4xl h-full sm:h-5-5/6 bg-gray rounded-md flex flex-col shadow-xl">
        <div className="bg-sage p-3 sm:rounded-tl-md sm:rounded-tr-md">
          <h1 className="font-cabin text-center text-white text-3xl mb-2">Unscrambla</h1>
          <div className="flex justify-between">
            <GameScores name={name} type={'you'} score={score} />
            <div className="font-extrabold flex-grow text-center">vs</div>
            <GameScores name={opponentName} type={'opponent'} score={opponentScore} />
          </div>
          <div className="text-center text-3xl font-bold text-white">
            <Timer
              initialTime={1000 * 60 * 3}
              direction="backward"
            >
              <Timer.Minutes formatValue={(value) => `${(value < 10 ? ` 0${value}` : `${value}`)}`} /> :
              <Timer.Seconds formatValue={(value) => `${(value < 10 ? ` 0${value}` : ` ${value}`)}`} />
            </Timer>
          </div>
        </div>
        <div className="bg-deep-koamoru p-4 text-center text-3xl font-bold text-azureish-white tracking-widest">
          {scrambledWord}
        </div>
        <div className="flex flex-col flex-grow overflow-y-scroll p-4" ref={messagesElement}>
          {messages.map((message, index) => {
            if(message.type === 'admin') return <AdminMessage message={message.msg} key={index} />
            else if(message.type === 'user') return <Message key={index} message={message.msg} selfMessage={true} />
            return <Message key={index} message={message.msg} />
          })}
        </div>
        <form onSubmit={submitWord} className="bg-sage p-2 sm:p-3 sm:rounded-bl-md sm:rounded-br-md justify-self-end flex">
          <input className="flex-grow pl-3" type="text" placeholder="Enter word here" value={pick} onChange={e => setPick(e.target.value.trim())} required />
          <button className="w-28 bg-deep-koamoru text-white font-bold rounded-tr-md rounded-br-md p-3 sm:p-2">SEND</button>
        </form>
      </div>
    </div>
  )
};

export default Game