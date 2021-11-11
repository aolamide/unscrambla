import React, { useContext, useState } from 'react'
import { ConnectionContext } from '../../connection'

const NameForm = ({ host, gameCode }) => {
  const [name, setName] = useState('');
  const socket = useContext(ConnectionContext);

  const hostGame = e => {
    e.preventDefault();
    socket.emit('createGame', name);
  }

  const joinGame = e => {
    e.preventDefault();
    socket.emit('joinGame', { playerName : name, gameCode });
  }
  return (
    <>
      <form className="flex flex-col justify-center items-center bg-white rounded-md p-4 w-11/12 sm:w-96 shadow-md" onSubmit={host ? hostGame : joinGame}>
        <input required autoComplete=".." value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter your nickname" className="w-full rounded-md bg-transparent border-2 border-gray p-2 text-xl" />
        <button className="text-white rounded-md p-3 mt-3 font-bold w-full bg-black">{host ? 'HOST GAME' : 'JOIN GAME'}</button>
      </form>
    </>
  )
};


export default NameForm