import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ActiveGameGuard } from "./core/guards/active-game/active-game.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: async () => (await import("./pages/home/home.module")).HomePageModule,
  },
  {
    path: "about",
    loadChildren: async () => (await import("./pages/about/about.module")).AboutPageModule,
  },
  {
    path: "login",
    loadChildren: () => import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () => import("./pages/register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "",
    children: [
      { path: "game/setup", loadChildren: async () => (await import("./pages/setup-game/setup-game.module")).SetupGamePageModule },
      {
        path: "game/:pagePos",
        loadChildren: async () => (await import("./pages/game/game.module")).GamePageModule,
        canActivate: [ActiveGameGuard],
      },
      { path: "game", redirectTo: "game/dartboard" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
