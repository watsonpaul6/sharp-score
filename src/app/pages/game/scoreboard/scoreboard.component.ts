import { Component, OnInit, Inject } from "@angular/core";
import { DART_GAME_CONTROLLER } from 'src/app/core/core.module';
import { IDartGameController } from 'src/app/interfaces/dart-game-controller.interface';

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"],
})
export class ScoreboardComponent implements OnInit {
  constructor(@Inject(DART_GAME_CONTROLLER) private dartGameController: IDartGameController) {}

  public get scoreboardDisplay$() {
    return this.dartGameController.scoreboardDisplayData$;
  }

  ngOnInit() {
  }
}
