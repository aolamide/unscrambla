import React from 'react';

export interface IGameScoresProps {
  name: string;
  type: 'player' | 'opponent';
  score: number;
}

const GameScores = ({ name, type, score }: IGameScoresProps) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex items-center gap-2 text-lg font-semibold text-azureish-white/70">
        <img
          src={type === 'player' ? '/user.svg' : '/knight.svg'}
          alt={type}
          className="w-6 h-6"
        />
        <span>{name}</span>
      </div>
      <div className="bg-white/20 px-4 py-2 rounded-xl text-xl font-bold text-white shadow-lg">
        {score}
      </div>
    </div>
  );
};

export default GameScores;
