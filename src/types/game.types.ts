export interface SkippedWords {
  scrambled: string;
  word: string;
}

export interface IGame {
  host: string;
  hostName: string;
  playerTwo: string;
  playerTwoName: string;
  hostScore: number;
  playerTwoScore: number;
  gameId: string;
  currentWord: string;
  currentScrambled: string;
  hostReplay: boolean;
  playerTwoReplay: boolean;
  gameLive: boolean;
  skippedWords: SkippedWords[];
}

export interface IJoinGame {
  playerName: string;
  gameCode: string;
}

export interface IJoinGameResult {
  success: boolean;
  nameClash?: boolean;
  game?: IGame;
  msg?: string;
}

export interface IPlayerTry {
  wordPick: string;
  gameCode: string;
  userName: string;
}
