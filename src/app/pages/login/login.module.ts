import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LoginPageRoutingModule } from "./login-routing.module";

import { LoginPage } from "./login.page";
import { CoreModule } from "src/app/core/core.module";
import { AngularFireModule } from "@angular/fire";
import { LoginMethodsComponent } from "./components/login-methods.component";
import { EmailLoginComponent } from "./components/email-login.component";
import { LoginHostDirective } from "./directives/login.directive";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule, AngularFireModule, CoreModule],
  declarations: [LoginPage, LoginMethodsComponent, EmailLoginComponent, LoginHostDirective ],
})
export class LoginPageModule {}
