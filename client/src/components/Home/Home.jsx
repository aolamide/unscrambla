import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const Home = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [gameError, setGameError] = useState('');
  const [params, _] = useSearchParams();
  const navigate = useNavigate();

  const submitCode = e => {
    setError('');
    e.preventDefault();
    if(!code) setError('Please enter game code.');
    else if(code.split(' ')[1]) setError('No space in game codes.');
    navigate('/play?code=' + code);
  };

  useEffect(() => {
    let gError = params.get('gameError');
    if(gError) {
      setGameError(gError);
      setTimeout(() => {
        setGameError('');
        navigate('/');
      }, 1500)
    }
  }, []);

  return (
    <>
      <form onSubmit={submitCode} className="flex flex-col justify-center items-center bg-white rounded-md p-4 w-11/12 sm:w-96 shadow-md">
        <input className="w-full rounded-md bg-transparent border-2 border-gray p-2 text-xl text-center font-bold appearance-none" type="tel" value={code} onChange={e => setCode(e.target.value.trim())} name='code' placeholder="Enter game code" maxLength="6" required autoComplete="off" />
        <p className='text-red-600 text-sm font-bold'>{error}</p>
        <button className="text-brown-light rounded-md p-3 mt-3 font-bold w-full bg-black">Join Game</button>
      </form>
      <p className="font-bold m-2.5 text-white">OR</p>
      <Link to='/play'className="w-11/12 sm:w-96">
        <button className="text-deep-koamoru rounded-md p-3 mt-3 font-bold w-full shadow-md bg-azureish-white">HOST GAME</button>
      </Link>
      {gameError && 
        <div class="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm bg-red-500 p-4 text-white animate-bounce">
          {gameError}
      </div>
      }
    </>
  )
}

export default Home;