import Game from '../model/game.model';
import { Request, Response } from 'express';
import { games } from '../helpers/game';

const fetchLiveGames = (req: Request, res: Response) => {
  const activeGames = games;
  for (const game in activeGames) {
    activeGames[game].currentWord = '';
  }
  res.json(activeGames);
  return;
};

const fetchAllGames = async (req: Request, res: Response) => {
  try {
    const gameList = await Game.find();
    res.json(gameList);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json();
    return;
  }
};

const GamesController = { fetchAllGames, fetchLiveGames };

export default GamesController;
