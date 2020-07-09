import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DartGameThrow } from "src/app/models";

@Component({
  selector: "app-dartboard",
  templateUrl: "./dartboard.component.html",
  styleUrls: ["./dartboard.component.scss"],
})
export class DartboardComponent implements OnInit {
  @Output() clickDartThrow = new EventEmitter<DartGameThrow>();
  @Output() clickClear = new EventEmitter();
  @Output() clickFinish = new EventEmitter();

  public readonly dartboard = DartboardFactory.GetDartboardSimple;
  constructor() {}

  ngOnInit() {}

  valueMultiplier = 1;
  public get multiplierString() {
    return `X${this.valueMultiplier}`;
  }

  onClickDartThrow(dartThrow: DartGameThrow) {
    if (dartThrow.text === "X2") {
      this.valueMultiplier = this.valueMultiplier === 2 ? 1 : 2;
    } else if (dartThrow.text === "X3") {
      this.valueMultiplier = this.valueMultiplier === 3 ? 1 : 3;
    } else {
      if (
        (dartThrow.value === 0 && this.valueMultiplier == 2) ||
        (dartThrow.value === 0 && this.valueMultiplier == 3) ||
        (dartThrow.value === 25 && this.valueMultiplier === 3)
      ) {
        this.valueMultiplier = 1;
        return;
      }
      let multiplierChar = this.valueMultiplier === 3 ? "T" : this.valueMultiplier === 2 ? "D" : "";
      this.clickDartThrow.emit(
        new DartGameThrow(`${multiplierChar}${dartThrow.text}`, dartThrow.value * this.valueMultiplier)
      );
      this.valueMultiplier = 1;
    }
  }

  onClickClear() {
    this.clickClear.emit();
  }

  onClickFinish() {
    this.clickFinish.emit();
  }
}

class DartboardFactory {
  public static get GetDartboardSimple() {
    let dartboard: DartGameThrow[][] = [];
    let boardRow = [
      new DartGameThrow("BULL", 25, "half"),
      new DartGameThrow("X2", -1, "sixth"),
      new DartGameThrow("X3", -1, "sixth"),
      new DartGameThrow("0", 0, "sixth"),
    ];
    dartboard.push(boardRow);
    for (let r = 5; r > 0; r--) {
      boardRow = [];
      for (let c = 0; c < 4; c++) {
        let dartNumber = r * 4 - c;
        boardRow.push(new DartGameThrow(`${dartNumber}`, dartNumber, "fourth"));
      }
      dartboard.push(boardRow);
    }
    return dartboard;
  }
}
