import React, { useContext, useEffect, useState } from 'react';
import { ConnectionContext } from '../../connection';

export interface INameFormProps {
  host: boolean;
  gameCode: string;
}

const NameForm = ({ host, gameCode }: INameFormProps) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const socket = useContext(ConnectionContext);

  const submitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket.connected) {
      setError('');
      if (!name) setError('Please enter your name');
      else if (name.split(' ')[1]) setError('No space allowed in name');
      else
        host
          ? socket.emit('createGame', name)
          : socket.emit('joinGame', { playerName: name, gameCode });
    }
  };
  useEffect(() => {
    socket.on('nameClash', () =>
      setError('Nickname already used, please use a different name.'),
    );
    return () => {
      socket.off('nameClash');
    };
  }, []);

  return (
    <>
      <form
        className="flex flex-col justify-center items-center bg-white rounded-md p-4 w-11/12 sm:w-96 shadow-md"
        onSubmit={submitName}
      >
        <input
          required
          autoComplete=".."
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
          type="text"
          placeholder="Enter your nickname"
          className={`w-full rounded-md bg-transparent border-2 ${error ? 'border-red-500' : 'border-gray'} p-2 text-xl`}
        />
        <p className="text-red-600 text-sm font-bold">{error}</p>
        <button className="text-white rounded-md p-3 mt-3 font-bold w-full bg-black">
          {host ? 'HOST GAME' : 'JOIN GAME'}
        </button>
      </form>
    </>
  );
};

export default NameForm;
