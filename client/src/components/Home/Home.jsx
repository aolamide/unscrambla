import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const submitCode = e => {
    e.preventDefault();
    navigate('/play?code=' + code);
  };

  return (
    <>
      <form onSubmit={submitCode} className="flex flex-col justify-center items-center bg-white rounded-md p-4 w-11/12 sm:w-96 shadow-md">
        <input className="w-full rounded-md bg-transparent border-2 border-gray p-2 text-xl text-center font-bold appearance-none" type="tel" value={code} onChange={e => setCode(e.target.value)} name='code' placeholder="Enter game code" maxLength="6" required autoComplete="off" />
        <button className="text-brown-light rounded-md p-3 mt-3 font-bold w-full bg-black">Join Game</button>
      </form>
      <p className="font-bold m-2.5 text-white">OR</p>
      <Link to='/play'className="w-11/12 sm:w-96">
        <button className="text-deep-koamoru rounded-md p-3 mt-3 font-bold w-full shadow-md bg-azureish-white">HOST GAME</button>
      </Link>
    </>
  )
}

export default Home;