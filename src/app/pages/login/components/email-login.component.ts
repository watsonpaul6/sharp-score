import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "login-method-email",
  template: `
    <ion-card>
      <ion-card-content>
        <ion-item>
          <ion-input placeholder="Email" type="email" [(ngModel)]="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="Password" type="password" [(ngModel)]="password"></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-button slot="start" (click)="onClickCancel()" expand="full" fill="solid">
            Cancel
          </ion-button>
          <ion-button slot="end" (click)="onEmailSignIn()" expand="full" fill="solid">
            Login
          </ion-button>
        </ion-item>
      </ion-card-content>
    </ion-card>
  `,
  styles: ["ion-card {margin: auto; transform: translateX(-50%) translateY(-50%); top: 40%; left: 50%; position: absolute;}"],
})
export class EmailLoginComponent implements OnInit {
  @Output() clickCancel = new EventEmitter();
  @Output() clickEmailSignIn = new EventEmitter<{ email: string; password: string }>();
  email: string = "";
  password: string = "";
  constructor() {}

  ngOnInit() {}

  onClickCancel() {
    this.clickCancel.emit();
  }

  onEmailSignIn() {
    this.clickEmailSignIn.emit({ email: this.email, password: this.password });
  }
}
