import { Injectable } from "@angular/core";
import { IDartGameController } from "src/app/interfaces/dart-game-controller.interface";
import { DartGameOptions, DartGameTurn, DartGameScoreboardDisplay, DartGameThrow, DartGameRound } from "src/app/models";
import { Observable, BehaviorSubject } from "rxjs";
import { DefaultGameOptions } from "src/app/models/default-gameoptions.factory";
import { map, reduce } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NewGameControllerService implements IDartGameController {
  constructor() {
    this.scoreboardDisplay$ = this.gameRoundsSubject.pipe(this.mapRoundsToScoreboard());
  }

  players: string[] = [];
  winner: string;

  gameOptions: DartGameOptions = DefaultGameOptions[0];
  gameBeingPlayed: boolean = false;

  // currentTurn: DartGameTurn;
  public get currentTurn() {
    return this.gameRounds[this.currentRoundIndex].turns[this.currentTurnIndex];
  }
  private currentTurnIndex = 0;
  private currentRoundIndex = 0;
  gameRounds: DartGameRound[] = [];
  private gameRoundsSubject = new BehaviorSubject<DartGameRound[]>([]);
  scoreboardDisplay$: Observable<DartGameScoreboardDisplay>;

  initNewGame(): void {
    this.gameBeingPlayed = true;
    this.gameRounds = [];
    let firstRound = this.initNewRound();
    this.gameRounds.push(firstRound);
    this.gameRoundsSubject.next(this.gameRounds);
    this.currentTurnIndex = 0;
    this.currentRoundIndex = 0;
  }
  addThrowCurrentTurn(dartThrow: DartGameThrow): void {
    this.currentTurn.dartThrows.push(dartThrow)
  }
  removeThrowCurrentTurn(throwIdx: number): void {
    this.currentTurn.removeDartThrow(throwIdx);
  }
  clearThrowsCurrentTurn(): void {
    this.currentTurn.clearDartThrows();
  }
  endCurrentTurn(): void {
    throw new Error("Method not implemented.");
  }

  private initNewRound() {
    let newRound = new DartGameRound();
    newRound.roundNumber = this.gameRounds.length + 1;
    newRound.turns = [];
    for (const player of this.players) {
      let newTurn = new DartGameTurn(player);
      newRound.turns.push(newTurn);
    }
    return newRound;
  }

  private readonly mapRoundsToScoreboard = () =>
    map((rounds: DartGameRound[]) => {
      let display = new DartGameScoreboardDisplay();
      let newHeaderRow = this.players.map((val) => ({ text: val, colSpan: 2 }));
      display.headers.push(newHeaderRow);
      for (let round of rounds) {
        let newRow = [];
        for (let turn of round.turns) {
          newRow.push(turn.ThrowTotal);
        }
      }
      return display;
    });
}
