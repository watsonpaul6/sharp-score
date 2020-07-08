import {
  DartGameThrow,
  DartGameOptions,
  DartGameTurn,
  DartGameScoreboardDisplay,
  DartGameRound,
  DartGameTurnDisplay,
} from "../models";
import { Observable } from "rxjs";

export interface IDartGameController {
  ///new
  players: string[];
  winner: string;

  gameOptions: DartGameOptions;
  gameBeingPlayed: boolean;

  turnDisplayData$: Observable<DartGameTurnDisplay>;
  scoreboardDisplayData$: Observable<DartGameScoreboardDisplay>;

  initNewGame(): void;

  addThrowCurrentTurn(dartThrow: DartGameThrow): void;
  removeThrowCurrentTurn(throwIdx: number): void;
  clearThrowsCurrentTurn(): void;
  endCurrentTurn(): void;

  //  /// old
  // players: string[];
  // winner: string;

  // gameOptions: DartGameOptions;
  // gameBeingPlayed: boolean;

  // currentTurn: DartGameTurn;

  // scoreboardDisplay$: Observable<DartGameScoreboardDisplay>;

  // scores: {
  //   player: string;
  //   score: number | { bed: string; hits: number }[];
  //   isIn: boolean;
  // }[];
  // turnBufferScores: { player: string; score: any; isIn: boolean }[];

  // initNewGame(): void;

  // addThrowCurrentTurn(dartThrow: DartGameThrow): void;
  // removeThrowCurrentTurn(throwIdx: number): void;
  // clearThrowsCurrentTurn(): void;
  // endCurrentTurn(): void;
}
