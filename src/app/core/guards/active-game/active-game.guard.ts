import { Injectable, Inject } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { IDartGameController } from "src/app/interfaces/dart-game-controller.interface";
import { DART_GAME_CONTROLLER } from "../../core.module";

@Injectable({
  providedIn: "root",
})
export class ActiveGameGuard implements CanActivate {
  constructor(@Inject(DART_GAME_CONTROLLER) private dartGameController: IDartGameController, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.dartGameController.gameBeingPlayed) {
      this.router.navigate(["/game/setup"]);
      return false;
    }

    return true;
  }
}
