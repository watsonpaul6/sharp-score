import { Injectable } from "@angular/core";
import { IDartGameController } from "src/app/interfaces/dart-game-controller.interface";
import {
  DartGameOptions,
  DartGameTurn,
  DartGameScoreboardDisplay,
  DartGameThrow,
  DartGameRound,
  DartGameRules,
  DartGameTurnDisplay,
} from "src/app/models";
import { Observable, BehaviorSubject } from "rxjs";
import { DefaultGameOptions } from "src/app/models/default-gameoptions.factory";
import { map, reduce, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NewGameControllerService implements IDartGameController {
  constructor() {
    this.scoreboardDisplayData$ = this.gameRoundsSubject.pipe(this.mapRoundsToScoreboard());
    this.turnDisplayData$ = this.currentTurnSubject.pipe(this.mapTurnToTurnDisplay());
  }

  players: string[] = [];
  winner: string;

  gameOptions: DartGameOptions = DefaultGameOptions[0];
  gameBeingPlayed: boolean = false;

  public get currentTurn() {
    return this.gameRounds[this.currentRoundIndex].turns[this.currentTurnIndex];
  }

  private currentTurnIndex = 0;
  private currentRoundIndex = 0;
  private gameRounds: DartGameRound[] = [];

  private gameRoundsSubject = new BehaviorSubject<DartGameRound[]>([]);
  private currentTurnSubject = new BehaviorSubject<DartGameTurn>(null);

  turnDisplayData$: Observable<DartGameTurnDisplay>;
  scoreboardDisplayData$: Observable<DartGameScoreboardDisplay>;

  initNewGame(): void {
    this.gameBeingPlayed = true;
    this.gameRounds = [];

    let firstRound = this.initNewRound();
    this.gameRounds.push(firstRound);
    this.currentTurnIndex = 0;
    this.currentRoundIndex = 0;
    this.updateSubjects();
  }
  addThrowCurrentTurn(dartThrow: DartGameThrow): void {
    if (this.currentTurn.dartThrows.length >= this.gameOptions.throwsPerTurn) return;
    if (!this.currentTurn.isIn) {
      if (this.checkDartThrowInOuts(dartThrow, "in")) {
        this.currentTurn.isIn = true;
        dartThrow.gotIn = true;
      } else {
        dartThrow.doesNotCount = true;
      }
    }
    this.currentTurn.dartThrows.push(dartThrow);
    this.updateSubjects();
  }
  removeThrowCurrentTurn(throwIdx: number): void {
    const otherValidThrow = this.currentTurn.dartThrows.find((val, idx) => {
      return this.checkDartThrowInOuts(val, "in") && throwIdx !== idx;
    });
    let replacedInDart = false;
    if (this.currentTurn.dartThrows[throwIdx].gotIn) {
      if (otherValidThrow) {
        otherValidThrow.gotIn = true;
        replacedInDart = true;
      } else {
        this.currentTurn.isIn = false;
      }
    }

    if (!this.currentTurn.isIn) {
      this.currentTurn.dartThrows.forEach((val) => (val.doesNotCount = true));
    }

    this.currentTurn.removeDartThrow(throwIdx);
    if (replacedInDart) {
      for (let dt of this.currentTurn.dartThrows) {
        if (!dt.gotIn) {
          dt.doesNotCount = true;
        } else break;
      }
    }
    this.updateSubjects();
  }
  clearThrowsCurrentTurn(): void {
    for (let dt of this.currentTurn.dartThrows) {
      if (dt.gotIn) {
        this.currentTurn.isIn = false;
        break;
      }
    }
    this.currentTurn.clearDartThrows();
    this.updateSubjects();
  }
  endCurrentTurn(): void {
    if (this.currentTurn.dartThrows.length !== this.gameOptions.throwsPerTurn) return;
    this.currentTurnIndex++;
    if (this.currentTurnIndex >= this.players.length) this.roundEndAddNew();
    this.updateSubjects();
  }

  private roundEndAddNew() {
    this.currentRoundIndex++;
    this.currentTurnIndex = 0;
    let newRound = this.initNewRound();
    this.gameRounds.push(newRound);
  }

  private updateSubjects() {
    this.gameRoundsSubject.next(this.gameRounds);
    this.currentTurnSubject.next(this.currentTurn);
  }

  private initNewRound() {
    let newRound = new DartGameRound();
    newRound.roundNumber = this.gameRounds.length + 1;
    newRound.turns = [];
    for (const player of this.players) {
      let previousScore = this.gameOptions.startingScore;
      let isIn = false;
      if (this.gameRounds.length >= 1) {
        let previousTurn = this.gameRounds[this.gameRounds.length - 1].turns.find((turn) => (turn.playerId = player));
        previousScore = previousTurn.turnRunningScore;
        isIn = previousTurn.isIn;
      }
      let newTurn = new DartGameTurn(player, previousScore);
      newTurn.isIn = isIn;
      newRound.turns.push(newTurn);
    }
    return newRound;
  }

  private calcTurnScore(dartTurn: DartGameTurn) {
    let turnScore: number;
    switch (this.gameOptions.scoreRule) {
      case DartGameRules.ScoreRule.Baseball:
        const inning = this.currentRoundIndex + 1;
        const atBats = Math.floor(dartTurn.dartThrows.length / 3);
        let turnTotal = 0;
        for (let i = 0; i < atBats; i++) {
          let highestSwing = 0;
          for (let j = 0; j < 3; j++) {
            const throwIndex = 3 * i + j;
            switch (dartTurn.dartThrows[throwIndex].text) {
              case `${inning}`:
                if (highestSwing < 1) highestSwing = 1;
                break;
              case `D${inning}`:
                if (highestSwing < 2) highestSwing = 2;
                break;
              case `T${inning}`:
                if (highestSwing < 3) highestSwing = 3;
                break;
              default:
                break;
            }
          }
          turnTotal += highestSwing;
        }
        turnScore = turnTotal;
        break;
      case DartGameRules.ScoreRule.Cricket:
        break;
      default:
        turnScore = dartTurn.ThrowTotal;
        break;
    }
    return turnScore;
  }

  private checkDartThrowInOuts(dartThrow: DartGameThrow, rulesToCheck: "in" | "out") {
    const rules = rulesToCheck === "in" ? this.gameOptions.inRules : this.gameOptions.outRules;
    let dartThrowIsIn = false;
    if (dartThrow.value <= 0) {
      return dartThrowIsIn;
    }
    if (rules.length === 0 || rules.length === 3) {
      dartThrowIsIn = true;
    } else if (rules.includes(DartGameRules.InOutRule.Triple) && dartThrow.text.includes("T")) {
      dartThrowIsIn = true;
    } else if (rules.includes(DartGameRules.InOutRule.Double) && dartThrow.text.includes("D")) {
      dartThrowIsIn = true;
    } else if (
      rules.includes(DartGameRules.InOutRule.Single) &&
      !dartThrow.text.includes("T") &&
      !dartThrow.text.includes("D")
    ) {
      dartThrowIsIn = true;
    }
    return dartThrowIsIn;
  }

  // Operator Function for scoreboard display observable
  private readonly mapRoundsToScoreboard = () =>
    map((rounds: DartGameRound[]) => {
      let display = new DartGameScoreboardDisplay();
      let newHeaderRow = this.players.map((val) => ({ text: val, colSpan: 2 }));
      display.headers.push(newHeaderRow);
      for (let round of rounds) {
        let newRow = [];
        for (let turn of round.turns) {
          newRow.push({ text: `${turn.ThrowTotal} ${this.currentTurn.turnRunningScore}` });
        }
        display.body.push(newRow);
      }
      return display;
    });

  private readonly mapTurnToTurnDisplay = () =>
    map((turn: DartGameTurn) => {
      let display = new DartGameTurnDisplay();
      display.player = turn.playerId;
      display.turnScore = this.calcTurnScore(turn);
      display.dartThrows = turn.dartThrows;
      display.totalScore = turn.turnRunningScore;
      display.isIn = turn.isIn;
      return display;
    });
}
