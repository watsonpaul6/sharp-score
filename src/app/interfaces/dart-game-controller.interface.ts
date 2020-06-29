import { DartGameThrow, DartGameOptions, DartGameTurn, DartGameScoreboardDisplay, DartGameRound } from "../models";
import { Observable } from "rxjs";

export interface IDartGameController {
  ///new

  /// old
  players: string[];
  winner: string;

  gameOptions: DartGameOptions;
  gameBeingPlayed: boolean;

  currentTurn: DartGameTurn;

  scoreboardDisplay$: Observable<DartGameScoreboardDisplay>;

  initNewGame(players?: string[]): void;

  addThrowCurrentTurn(dartThrow: DartGameThrow): void;
  removeThrowCurrentTurn(throwIdx: number): void;
  clearThrowsCurrentTurn(): void;
  endCurrentTurn(): void;
}
