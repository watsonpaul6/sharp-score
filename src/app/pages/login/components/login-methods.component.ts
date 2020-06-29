import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "login-methods",
  template: ` <ion-card>
    <ion-card-content>
      <ion-item lines="none" class="btn-item">
        <ion-icon name="logo-google"></ion-icon>
        <ion-button (click)="onGoogleSignIn()" expand="full" fill="outline" size="large">
          with Google
        </ion-button>
      </ion-item>
      <ion-item lines="none" class="btn-item">
        <ion-icon name="mail-sharp"></ion-icon>
        <ion-button (click)="onEmailSignIn()" expand="full" fill="outline" size="large">
          with Email
        </ion-button>
      </ion-item>

      <ion-item lines="none">
        <ion-note slot="end" color="dark"> or register with email <a routerLink="/register">here</a> </ion-note>
      </ion-item>
    </ion-card-content>
  </ion-card>`,
  //   styles: [".btn-item {display: flex;}", "ion-button{margin: 7px auto; width: 100%;"],
  styles: [
    "ion-card {margin: auto; transform: translateX(-50%) translateY(-50%); top: 40%; left: 50%; position: absolute;}",
    ".btn-item {display: flex;}",
    "ion-button{flex: 1;",
  ],
})
export class LoginMethodsComponent implements OnInit {
  @Output() clickGoogle = new EventEmitter<any>();
  @Output() clickEmail = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onGoogleSignIn() {
    this.clickGoogle.emit();
  }
  onEmailSignIn() {
    this.clickEmail.emit();
  }
}
