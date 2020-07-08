import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonSlides } from "@ionic/angular";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { DartGameThrow } from "src/app/models";
import { DART_GAME_CONTROLLER } from 'src/app/core/core.module';
import { IDartGameController } from 'src/app/interfaces/dart-game-controller.interface';
import { DartGameStoreService } from 'src/app/core/services/dart-game-store/dart-game-store.service';

@Component({
  selector: "app-game",
  templateUrl: "./game.page.html",
  styleUrls: ["./game.page.scss"],
})
export class GamePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("slider") slider: IonSlides;

  constructor(
    @Inject(DART_GAME_CONTROLLER) private dartGameController: IDartGameController,
    public gameStore: DartGameStoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loc: Location
  ) {}

  ngOnInit() {}

  routeParamSubscription: Subscription;
  ngAfterViewInit() {
    this.routeParamSubscription = this.activatedRoute.params.subscribe((p) => {
      if (p.pagePos === "scoreboard" || p.pagePos === "dartboard") {
        let pageSliderIndex = p.pagePos === "scoreboard" ? 1 : 0;
        this.slider.slideTo(pageSliderIndex);
      } else {
        this.router.navigate(["/game/dartboard"]);
      }
    });
  }
  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }

  async onSlideEnd() {
    let pathString = (await this.slider.getActiveIndex()) === 0 ? "dartboard" : "scoreboard";
    this.loc.replaceState(`/game/${pathString}`);
  }

  onClickDartThrow(dartThrow: DartGameThrow) {
    this.dartGameController.addThrowCurrentTurn(dartThrow);
  }

  onClickClear() {
    this.dartGameController.clearThrowsCurrentTurn();
  }
  onClickFinish() {
    this.dartGameController.endCurrentTurn()
  }
}
