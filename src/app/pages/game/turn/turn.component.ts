import { Component, OnInit, Inject } from "@angular/core";
import { DART_GAME_CONTROLLER } from "src/app/core/core.module";
import { IDartGameController } from "src/app/interfaces/dart-game-controller.interface";

@Component({
  selector: "app-turn",
  templateUrl: "./turn.component.html",
  styleUrls: ["./turn.component.scss"],
})
export class TurnComponent implements OnInit {
  constructor(@Inject(DART_GAME_CONTROLLER) private dartGameController: IDartGameController) {}

  public get CurrentTurn() {
    return this.dartGameController.currentTurn;
  }
  ngOnInit() {}
}
