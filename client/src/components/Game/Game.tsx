import React, { useContext, useEffect, useRef, useState } from 'react';
import { ConnectionContext } from '../../connection';
import { useTimer } from 'react-timer-hook';
import GameScores from '../GameScores/GameScores';
import AdminMessage from '../Messages/AdminMessage';
import Message from '../Messages/Message';

export interface IGameProps {
  name: string;
  opponentName: string;
  gameCode: string;
  host: boolean;
}
export interface IGameState {
  score: number;
  opponentScore: number;
  messages: Array<{ type: string; msg: string }>;
  pick: string;
  scrambledWord: string;
}

const Game = ({ name, opponentName, gameCode, host }: IGameProps) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 60 * 3),
  });
  const [score, setScore] = useState<IGameState['score']>(0);
  const [opponentScore, setOpponentScore] =
    useState<IGameState['opponentScore']>(0);
  const [messages, setMessages] = useState<IGameState['messages']>([]);
  const [pick, setPick] = useState<IGameState['pick']>('');
  const [scrambledWord, setScrambledWord] =
    useState<IGameState['scrambledWord']>('');
  const socket = useContext(ConnectionContext);
  const messagesElement = useRef<HTMLDivElement>(null);

  const submitWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('playerTry', {
      wordPick: pick.toLowerCase(),
      gameCode,
      userName: name,
    });
    setMessages((messages) => [...messages, { type: 'user', msg: pick }]);
    setPick('');
  };

  useEffect(() => {
    if (messagesElement.current) {
      messagesElement.current.scrollTop = messagesElement.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('getScrambledWord', gameCode);

    socket.on('adminMessage', (msg) => {
      const newMsg = { type: 'admin', msg };
      setMessages((currentMessages) => [...currentMessages, newMsg]);
    });
    socket.on('opponentTry', (msg) => {
      const newMsg = { type: 'opponent', msg };
      setMessages((currentMessages) => [...currentMessages, newMsg]);
    });
    socket.on('newScrambledWord', (word) => {
      setScrambledWord(word);
    });
    socket.on('scoreUpdate', (update) => {
      if (update) {
        const { hostScore, playerTwoScore } = update;
        setScore(host ? hostScore : playerTwoScore);
        setOpponentScore(host ? playerTwoScore : hostScore);
      }
    });
    return () => {
      socket.off('adminMessage');
      socket.off('opponentTry');
      socket.off('newScrambledWord');
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-deep-koamoru/100 to-deep-koamoru/90 flex items-center justify-center h-screen">
      <div className="w-full sm:w-8/12 md:max-w-4xl h-full sm:h-5-5/6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center pb-4 border-b border-white/20">
          <h1 className="font-cabin text-2xl font-extrabold text-white tracking-wider">
            <img alt="Unscrambla" className="w-20" src="/unscrambla.svg" />
          </h1>
          <div className="flex items-center space-x-6">
            <GameScores type={'player'} score={score} name={name} />
            <span className="text-azureish-white text-xl">vs</span>
            <GameScores
              type={'opponent'}
              score={opponentScore}
              name={opponentName}
            />
          </div>
        </div>

        <div className="text-center my-6">
          <div
            className={`text-3xl font-bold ${minutes === 0 && seconds <= 30 ? 'text-red-500 animate-bounce' : 'text-yellow-400 animate-pulse'}`}
          >
            {minutes < 10 ? `0${minutes}` : minutes} :{' '}
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <div className="mt-4 bg-white/10 p-5 rounded-lg text-2xl font-semibold tracking-[0.3em] text-white shadow-lg">
            {scrambledWord}
          </div>
        </div>

        <div
          className="overflow-y-scroll flex flex-col flex-grow bg-white/10 p-4 rounded-lg space-y-2 border border-white/20 shadow-inner"
          ref={messagesElement}
        >
          {messages.map((message, index) => {
            if (message.type === 'admin')
              return <AdminMessage message={message.msg} key={index} />;
            else if (message.type === 'user')
              return (
                <Message key={index} message={message.msg} selfMessage={true} />
              );
            return <Message key={index} message={message.msg} />;
          })}
        </div>

        <form onSubmit={submitWord} className="mt-4 flex items-center">
          <input
            type="text"
            value={pick}
            onChange={(e) => setPick(e.target.value.trim())}
            required
            placeholder="Enter word here"
            className="flex-1 p-3 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-azureish-white outline-none shadow-lg placeholder-gray-400"
          />
          <button className="ml-3 bg-azureish-white text-black px-6 py-3 rounded-lg font-bold hover:bg-deep-koamoru hover:text-white transition-all shadow-lg">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default Game;
