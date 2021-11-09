import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const submitCode = e => {
    e.preventDefault();
    navigate('/play?code=' + code);
  }

  return (
    <div>
      <form onSubmit={submitCode}>
        <h2>JOIN GAME</h2>
        <input type="text" value={code} onChange={e => setCode(e.target.value)} name='code' placeholder="Enter game code" />
        <button>Join Game</button>
      </form>
      <p>OR</p>
      <Link to='/play'>
        HOST GAME
      </Link>
    </div>
  );
}


export default Home;