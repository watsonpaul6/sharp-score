import { Component, OnInit, ViewChild, AfterViewInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonSlides } from "@ionic/angular";
import { DART_GAME_CONTROLLER } from "src/app/core/core.module";
import { IDartGameController } from "src/app/interfaces/dart-game-controller.interface";
import { UserAuthService } from "src/app/core/services/user-auth/user-auth.service";

@Component({
  selector: "app-setup-game",
  templateUrl: "./setup-game.page.html",
  styleUrls: ["./setup-game.page.scss"],
})
export class SetupGamePage implements OnInit, AfterViewInit {
  @ViewChild("slides") slides: IonSlides;
  slideOpts = { effect: "coverflow" };

  constructor(
    @Inject(DART_GAME_CONTROLLER) public dartGameController: IDartGameController,
    private userAuth: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public get playersValidated() {
    return this.dartGameController.players.length > 0;
  }

  quickStart: boolean = false;
  ngOnInit() {
    this.getQueryParams();
    this.getUser();
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(this.quickStart);
  }

  onClickPlay() {
    this.dartGameController.initNewGame();
    this.router.navigate(["/game/dartboard"]);
  }

  nextSlide() {
    this.slides.slideNext();
  }
  private getQueryParams() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.has("quickStart")) {
        this.quickStart = params.get("quickStart") === "true";
      }
    });
  }
  private getUser() {
    this.userAuth.userInfo$.subscribe((user) => {
      if (user && !this.dartGameController.players.includes(user.displayName)) {
        this.dartGameController.players = [user.displayName, ...this.dartGameController.players];
      }
    });
  }
}
