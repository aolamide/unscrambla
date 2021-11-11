import React from 'react';

const GameScores = ({ name, type, score }) => {
  return (
    <div className="flex flex-col items-center w-5/12">
      <p className="text-deep-koamoru font-extrabold text-xl text-center">{name}</p>
      <p className="text-sm flex-grow">({type})</p>
      <p className="bg-black text-white text-xl rounded-md p-2 font-bold mt-3 w-9 h-9 flex justify-center items-center"><span>{score}</span></p>
    </div>
  )
}

export default GameScores;