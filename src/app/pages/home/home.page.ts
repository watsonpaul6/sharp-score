import { Component, OnInit } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { UserAuthService } from "src/app/core/services/user-auth/user-auth.service";
import { DartGame } from "src/app/models";
import { FirestoreService } from "src/app/core/services/firestore/firestore.service";
import { environment } from "src/environments/environment";
import { DartGameStoreService } from "src/app/core/services/dart-game-store/dart-game-store.service";
import { switchMap, tap } from "rxjs/operators";
import { UserInfo } from "src/app/models/user-info.model";
import { AngularFireFunctions } from "@angular/fire/functions";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    private dartGameStore: DartGameStoreService,
    private userAuth: UserAuthService,
  ) {}

  showSetupGameTooltip = false;

  games$: Observable<DartGame[]>;

  public get user$() {
    return this.userAuth.userInfo$;
  }

  ngOnInit() {
    this.games$ = this.userAuth.userInfo$.pipe(this.userToGames());
  }

  private readonly userToGames = () => switchMap((user: UserInfo) => this.dartGameStore.getGames$(user?.userCreds.uid));
}
