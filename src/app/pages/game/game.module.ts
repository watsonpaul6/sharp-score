import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { CoreModule } from 'src/app/core/core.module';
import { DartboardComponent } from './dartboard/dartboard.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { TurnComponent } from './turn/turn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    CoreModule
  ],
  declarations: [GamePage, DartboardComponent, ScoreboardComponent, TurnComponent]
})
export class GamePageModule {}
