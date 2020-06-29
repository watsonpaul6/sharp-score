import { NgModule, ModuleWithProviders, InjectionToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { IDartGameController } from "../interfaces/dart-game-controller.interface";
import { OrdinalPipe } from "./pipes/ordinal-pipe/ordinal.pipe";
import { GameControllerService } from "./services/game-controller/game-controller.service";
import { UserAuthService } from "./services/user-auth/user-auth.service";
import { NewUserModalComponent } from "./components/new-user-modal.component";
import { FormsModule } from "@angular/forms";
import { HeaderPopoverComponent } from "./components/header-popover.component";
import { EditUserModalComponent } from "./components/header/edit-user-modal.component";
import { DocPipe } from "./pipes/doc-pipe/doc-pipe.pipe";

export const DART_GAME_CONTROLLER = new InjectionToken<IDartGameController>("dart_game_controller");

@NgModule({
  declarations: [
    HeaderComponent,
    OrdinalPipe,
    DocPipe,
    NewUserModalComponent,
    EditUserModalComponent,
    HeaderPopoverComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule],
  providers: [],
  exports: [
    HeaderComponent,
    OrdinalPipe,
    DocPipe,
    NewUserModalComponent,
    EditUserModalComponent,
    HeaderPopoverComponent,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: DART_GAME_CONTROLLER, useClass: GameControllerService }, UserAuthService],
    };
  }
}
