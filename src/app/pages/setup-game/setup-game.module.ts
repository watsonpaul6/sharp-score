import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SetupGamePageRoutingModule } from "./setup-game-routing.module";

import { SetupGamePage } from "./setup-game.page";
import { CoreModule } from "src/app/core/core.module";
import { SetupPlayersComponent } from "./setup-players/setup-players.component";
import { SetupGametypeComponent } from './setup-gametype/setup-gametype.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SetupGamePageRoutingModule, CoreModule],
  declarations: [SetupGamePage, SetupPlayersComponent, SetupGametypeComponent],
})
export class SetupGamePageModule {}
