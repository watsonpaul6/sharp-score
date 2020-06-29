import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentFactory } from "@angular/core";
import { Router } from "@angular/router";
import { LoginHostDirective } from "./directives/login.directive";
import { LoginMethodsComponent } from "./components/login-methods.component";
import { EmailLoginComponent } from "./components/email-login.component";

import { UserAuthService } from "src/app/core/services/user-auth/user-auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  @ViewChild(LoginHostDirective, { static: true }) loginHost: LoginHostDirective;
  private readonly loginMethodsFactory: ComponentFactory<LoginMethodsComponent>;
  private readonly emailLoginFactory: ComponentFactory<EmailLoginComponent>;

  constructor(private router: Router, private compFactoryResolver: ComponentFactoryResolver, private userAuth: UserAuthService) {
    this.loginMethodsFactory = this.compFactoryResolver.resolveComponentFactory(LoginMethodsComponent);
    this.emailLoginFactory = this.compFactoryResolver.resolveComponentFactory(EmailLoginComponent);
  }

  ngOnInit() {
    this.userAuth.userInfo$.subscribe((user) => {
      if (user) {
        this.router.navigate(["/home"]);
      }
    });
    this.showLoginMethodsComponent();
  }

  private showLoginMethodsComponent() {
    this.loginHost.viewContainerRef.clear();
    let compRef = this.loginHost.viewContainerRef.createComponent(this.loginMethodsFactory);
    compRef.instance.clickEmail.subscribe(() => {
      this.showEmailLoginComponent();
    });
    compRef.instance.clickGoogle.subscribe(async () => {
      await this.userAuth.signInWithGoogle();
      this.router.navigate(["/home"]);
    });
  }

  private showEmailLoginComponent() {
    this.loginHost.viewContainerRef.clear();
    let compRef = this.loginHost.viewContainerRef.createComponent(this.emailLoginFactory);
    compRef.instance.clickCancel.subscribe(() => {
      this.showLoginMethodsComponent();
    });
    compRef.instance.clickEmailSignIn.subscribe((_) => {
      this.userAuth.signInWithEmailAndPassword(compRef.instance.email, compRef.instance.password);
    });
  }
}
