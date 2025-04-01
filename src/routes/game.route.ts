import { Router } from 'express';
import GamesController from '../controllers/game.controller';
import { asyncHandler } from '../helpers/async-handler.helper';

const gameRouter = Router();

gameRouter.get('/live', asyncHandler(GamesController.fetchLiveGames));

gameRouter.get('/', asyncHandler(GamesController.fetchAllGames));

export default gameRouter;
