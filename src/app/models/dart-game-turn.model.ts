import { DartGameThrow } from './dart-game-throw.model';

export class DartGameTurn {
  dartThrows: DartGameThrow[] = [];
  playerId: string;

  constructor(playerId?: string) {
    this.playerId = playerId;
  }
  public get ThrowTotal() {
    return this.dartThrows.reduce((prev, curr) => (prev += curr.value), 0);
  }

  removeDartThrow(indexToRemove: number) {
    this.dartThrows = this.dartThrows.filter(
      (val, idx) => indexToRemove !== idx
    );
  }

  clearDartThrows() {
    this.dartThrows = [];
  }
}
