import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupGamePage } from './setup-game.page';

const routes: Routes = [
  {
    path: '',
    component: SetupGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupGamePageRoutingModule {}
