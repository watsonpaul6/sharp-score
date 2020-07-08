import { DartGameThrow } from "./dart-game-throw.model";

export class DartGameTurn {
  dartThrows: DartGameThrow[] = [];
  playerId: string;

  turnStartingScore: number;
  turnRunningScore: number;
  isIn: boolean;
  constructor(playerId: string, turnStartingScore: number) {
    this.playerId = playerId;
    this.turnStartingScore = turnStartingScore
    this.turnRunningScore = turnStartingScore;
  }
  public get ThrowTotal() {
    return this.dartThrows.reduce((prev, curr) => (prev += curr.value), 0);
  }

  removeDartThrow(indexToRemove: number) {
    this.dartThrows = this.dartThrows.filter((val, idx) => indexToRemove !== idx);
  }

  clearDartThrows() {
    this.dartThrows = [];
  }


}


export class dartThrowArray<T> extends Array<T> {
  push(...items: T[]) {
    return super.push(...items)
  }
}