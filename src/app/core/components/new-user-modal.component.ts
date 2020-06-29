import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-user-modal",
  template: `<app-header text="Welcome to SharpScore!" hideLogin hideMenuButton></app-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Change defualt user details</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form (ngSubmit)="onDismiss(newUserForm)" #newUserForm="ngForm">
            <ion-item>
              <ion-label position="floating">
                Display Name
              </ion-label>
              <ion-input
                required
                minlength="3"
                maxlength="20"
                pattern="[A-Za-z0-9]+"
                [(ngModel)]="displayName"
                name="displayName"
              ></ion-input>
            </ion-item>
            <ion-button type="submit" [disabled]="!newUserForm.valid">
              Submit
            </ion-button>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content> `,
  styles: ["ion-button { font-size: 1rem }"],
})
export class NewUserModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  @Input() displayName: string = "";

  ngOnInit() {}

  onDismiss(newUserForm: NgForm) {
    if (newUserForm.valid) {
      const newUserData: NewUserModalData = {
        displayName: `${this.displayName}`,
      };
      this.modalController.dismiss(newUserData);
    }
  }
}

export class NewUserModalData {
  displayName: string;
}
