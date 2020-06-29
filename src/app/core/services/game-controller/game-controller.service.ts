import { Injectable } from "@angular/core";
import { IDartGameController } from "src/app/interfaces/dart-game-controller.interface";
import {
  DartGameOptions,
  DartGameTurn,
  DartGameScoreboardDisplay,
  DartGameThrow,
  DartGameRound,
  DartGameRules,
} from "src/app/models";
import { Observable, BehaviorSubject } from "rxjs";
import { DefaultGameOptions } from "src/app/models/default-gameoptions.factory";
import * as assert from "assert";

@Injectable({
  providedIn: "root",
})
export class GameControllerService implements IDartGameController {
  // constructor() {}

  // players: string[] = [];
  // winner: string;

  // gameOptions: DartGameOptions = DefaultGameOptions[0];
  // gameBeingPlayed: boolean;

  // currentTurn: DartGameTurn;

  // get scoreboardDisplay$(): Observable<DartGameScoreboardDisplay> {
  //   throw new Error("Property not implemented.");
  // }

  // initNewGame(): void {
  //   this.gameBeingPlayed = true;
  //   this.currentTurn = new DartGameTurn(this.players[0])
  // }
  // addThrowCurrentTurn(dartThrow: DartGameThrow): void {
  //   throw new Error("Method not implemented.");
  // }
  // removeThrowCurrentTurn(throwIdx: number): void {
  //   throw new Error("Method not implemented.");
  // }
  // clearThrowsCurrentTurn(): void {
  //   throw new Error("Method not implemented.");
  // }
  // endCurrentTurn(): void {
  //   throw new Error("Method not implemented.");
  // }

  private readonly cricketBoard = ["20", "19", "18", "17", "16", "15", "B"];
  private cricketBoardOuts: {
    player: string;
    outs: { bed: string; closed: boolean }[];
  }[];

  gameBeingPlayed = false;

  gameOptions: DartGameOptions = DefaultGameOptions[0];
  players: string[] = [];
  winner: string;

  private _scoreBoardDisplay = new DartGameScoreboardDisplay();
  private scoreBoardDisplay = new BehaviorSubject<DartGameScoreboardDisplay>(this._scoreBoardDisplay);
  public get scoreboardDisplay$(): Observable<DartGameScoreboardDisplay> {
    return this.scoreBoardDisplay.asObservable();
  }

  rounds: DartGameRound[] = [];
  currentRound: DartGameTurn[] = [];
  currentTurn: DartGameTurn;

  scores: {
    player: string;
    score: number | { bed: string; hits: number }[];
    isIn: boolean;
  }[];
  turnBufferScores: { player: string; score: any; isIn: boolean }[];

  constructor() {}

  initNewGame() {
    assert(this.players.length >= 1, "At least one player is required to initialize a game");

    this.gameBeingPlayed = true;
    this.rounds = [];
    this.currentRound = [];

    this.currentTurn = new DartGameTurn(this.players[0]);
    // this.currentTurn = new DartGameTurn();
    // this.currentTurn.playerId = this.players[0];

    this.initScores();
    this.resetTurnBufferScores();

    this.cricketBoardOuts =
      this.gameOptions.scoreRule === DartGameRules.ScoreRule.Cricket
        ? this.players.map((p) => ({
            player: p,
            outs: this.cricketBoard.map((v) => ({ bed: v, closed: false })),
          }))
        : undefined;

    this.initScoreBoard();
  }

  private gameWon = false;
  addThrowCurrentTurn(dartThrow: DartGameThrow) {
    if (this.currentTurn.dartThrows.length < this.gameOptions.throwsPerTurn && !this.gameWon) {
      this.currentTurn.dartThrows.push(dartThrow);
      this.lazyUpdateTurnBufferScores();

      if (this.checkWinCondition(dartThrow)) {
        debugger;
        this.gameWon = true;
        this.winner = this.currentTurn.playerId;
      }
    }
  }

  removeThrowCurrentTurn(throwIdx: number = this.currentTurn.dartThrows.length - 1) {
    assert(throwIdx < this.currentTurn.dartThrows.length);
    this.currentTurn.removeDartThrow(throwIdx);
    this.lazyUpdateTurnBufferScores();
  }

  clearThrowsCurrentTurn() {
    this.currentTurn.clearDartThrows();
    this.resetTurnBufferScores();
  }

  endCurrentTurn() {
    if (this.gameWon) {
      console.log(`${this.currentTurn.playerId} Won!!`);
      debugger;
      return;
    }
    if (this.currentTurn.dartThrows.length !== this.gameOptions.throwsPerTurn) {
      return;
    }

    this.currentRound.push(this.currentTurn);
    this.setScoresFromTurnBuffer();
    this.updateScoreBoard();

    let nextPlayerIdx = this.players.findIndex((v) => v === this.currentTurn.playerId) + 1;
    if (nextPlayerIdx >= this.players.length) {
      nextPlayerIdx = 0;
      this.rounds.push({ turns: this.currentRound, roundNumber: this.currentRound.length - 1 });
      this.currentRound = [];
    }
    this.currentTurn = new DartGameTurn();
    this.currentTurn.playerId = this.players[nextPlayerIdx];
  }

  private checkWinCondition(dartThrow: DartGameThrow) {
    switch (this.gameOptions.winRule) {
      case DartGameRules.WinRule.TargetScore:
        // let currentPlayerScore = this.scores.find((v) => v.player === this.currentTurn.playerId).score;
        let currentPlayerScore = this.turnBufferScores.find((v) => v.player === this.currentTurn.playerId).score;
        if (currentPlayerScore === this.gameOptions.targetScore) {
          return true;
        }
        return false;
        break;
      case DartGameRules.WinRule.HighScore:
        break;
      case DartGameRules.WinRule.Cricket:
        break;
      default:
        break;
    }
  }

  private initScores() {
    switch (this.gameOptions.scoreRule) {
      case DartGameRules.ScoreRule.Cricket:
        this.scores = [];
        for (let p of this.players) {
          let scoreCricket = [];
          for (let cb of this.cricketBoard) {
            scoreCricket.push({ bed: cb, hits: 0 });
          }
          this.scores.push({ player: p, score: scoreCricket, isIn: false });
        }
        break;
      default:
        this.scores = [];
        for (let p of this.players) {
          this.scores.push({
            player: p,
            score: this.gameOptions.startingScore,
            isIn: false,
          });
        }
        break;
    }
  }

  private lazyUpdateTurnBufferScores() {
    this.resetTurnBufferScores();
    let currentScore = this.turnBufferScores.find((v) => v.player === this.currentTurn.playerId);
    switch (this.gameOptions.scoreRule) {
      case DartGameRules.ScoreRule.Add:
        for (let thrw of this.currentTurn.dartThrows) {
          if (!currentScore.isIn) {
            currentScore.isIn = this.checkIn(thrw);
          }
          if (currentScore.isIn) {
            currentScore.score += thrw.value;
          }
        }
        break;
      case DartGameRules.ScoreRule.Subtract:
        for (let thrw of this.currentTurn.dartThrows) {
          if (!currentScore.isIn) {
            currentScore.isIn = this.checkIn(thrw);
          }
          if (currentScore.isIn) {
            currentScore.score -= thrw.value;
          }
        }
        break;
      case DartGameRules.ScoreRule.Baseball:
        for (let thrw of this.currentTurn.dartThrows) {
          if (!currentScore.isIn) {
            currentScore.isIn = this.checkIn(thrw);
          }
          if (currentScore.isIn) {
            if (thrw.text === `T${this.rounds.length + 1}`) {
              currentScore.score += 3;
            } else if (thrw.text === `D${this.rounds.length + 1}`) {
              currentScore.score += 2;
            } else if (thrw.text === `${this.rounds.length + 1}`) {
              currentScore.score += 1;
            }
          }
        }
        break;
      case DartGameRules.ScoreRule.Cricket:
        break;
      default:
        break;
    }

    const idx = this.turnBufferScores.findIndex((v) => v.player === this.currentTurn.playerId);
    this.turnBufferScores[idx] = currentScore;
  }

  private setScoresFromTurnBuffer() {
    this.scores = new Array();

    for (let i = 0; i < this.turnBufferScores.length; i++) {
      let score = this.turnBufferScores[i].score;
      let player = this.turnBufferScores[i].player;
      let isIn = this.turnBufferScores[i].isIn;
      this.scores.push({ player, score, isIn });
    }
  }
  private resetTurnBufferScores() {
    this.turnBufferScores = new Array();

    for (let i = 0; i < this.scores.length; i++) {
      let score = this.scores[i].score;
      let player = this.scores[i].player;
      let isIn = this.scores[i].isIn;
      this.turnBufferScores.push({ player, score, isIn });
    }
  }

  private initScoreBoard() {
    this._scoreBoardDisplay = new DartGameScoreboardDisplay();
    this._scoreBoardDisplay.title = this.gameOptions.name;

    switch (this.gameOptions.scoreRule) {
      case DartGameRules.ScoreRule.Add:
        break;
      case DartGameRules.ScoreRule.Subtract:
        let newRow1 = [];
        let newRow2 = [];
        for (let p of this.players) {
          newRow1.push({ text: p, colSpan: 2 });
          newRow2.push({
            text: this.gameOptions.startingScore.toString(),
            colSpan: 2,
          });
        }
        this._scoreBoardDisplay.headers.push(newRow1);
        this._scoreBoardDisplay.headers.push(newRow2);
        this._scoreBoardDisplay.body.push([]);
        break;
      case DartGameRules.ScoreRule.Baseball:
        break;
      case DartGameRules.ScoreRule.Cricket:
        break;
      default:
        break;
    }
    this.scoreBoardDisplay.next(this._scoreBoardDisplay);
  }

  private updateScoreBoard() {
    switch (this.gameOptions.scoreRule) {
      case DartGameRules.ScoreRule.Add:
        break;
      case DartGameRules.ScoreRule.Subtract:
        let turnScoreCell = {
          text: this.currentTurn.ThrowTotal.toString(),
          colSpan: 1,
        };
        let runningScoreCell = {
          text: (this.turnBufferScores.find((v) => v.player === this.currentTurn.playerId).score as number).toString(),
          colSpan: 1,
        };

        this._scoreBoardDisplay.body[this.rounds.length].push(turnScoreCell);
        this._scoreBoardDisplay.body[this.rounds.length].push(runningScoreCell);
        if (this.currentRound.length === this.players.length) {
          this._scoreBoardDisplay.body.push([]);
        }
        break;
      case DartGameRules.ScoreRule.Baseball:
        break;
      case DartGameRules.ScoreRule.Cricket:
        break;
      default:
        break;
    }
    // console.log(this._scoreBoardDisplay)
    this.scoreBoardDisplay.next(this._scoreBoardDisplay);
  }

  private checkIn(thrw: DartGameThrow): boolean {
    if (this.gameOptions.inRules.length === 0 && thrw.value !== 0) {
      return true;
    }
    if (this.gameOptions.inRules.includes(DartGameRules.InOutRule.Single)) {
      if (!thrw.text.includes("D") && !thrw.text.includes("T") && thrw.value !== 0) {
        return true;
      }
    }
    if (this.gameOptions.inRules.includes(DartGameRules.InOutRule.Double) && thrw.value !== 0) {
      if (thrw.text.includes("D")) {
        return true;
      }
    }
    if (this.gameOptions.inRules.includes(DartGameRules.InOutRule.Triple) && thrw.value !== 0) {
      if (thrw.text.includes("T")) {
        return true;
      }
    }
    return false;
  }
  private checkOut(thrw: DartGameThrow): boolean {
    if (this.gameOptions.outRules.length === 0 && thrw.value !== 0) {
      return true;
    }
    if (this.gameOptions.outRules.includes(DartGameRules.InOutRule.Single)) {
      if (!thrw.text.includes("D") && !thrw.text.includes("T") && thrw.value !== 0) {
        return true;
      }
    }
    if (this.gameOptions.outRules.includes(DartGameRules.InOutRule.Double) && thrw.value !== 0) {
      if (thrw.text.includes("D")) {
        return true;
      }
    }
    if (this.gameOptions.outRules.includes(DartGameRules.InOutRule.Triple) && thrw.value !== 0) {
      if (thrw.text.includes("T")) {
        return true;
      }
    }
    return false;
  }
}
