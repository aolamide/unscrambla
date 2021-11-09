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
    <div>
      <form onSubmit={host ? hostGame : joinGame}>
        <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter your name" />
        <button>{host ? 'HOST GAME' : 'JOIN GAME'}</button>
      </form>
    </div>
  )
};


export default NameForm