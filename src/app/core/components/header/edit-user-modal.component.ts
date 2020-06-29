import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edit-user-modal",
  template: `<app-header text="Edit user details" hideLogin hideMenuButton></app-header>
    <ion-content>
      <form (ngSubmit)="onDismiss(newUserForm)" #newUserForm="ngForm">
        <ion-card>
          <ion-card-content>
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
          </ion-card-content>
        </ion-card>
        <ion-item lines="none" class="form-btns">
          <ion-button color="danger" slot="start" (click)="onCancel()" size="large">
            Cancel
          </ion-button>

          <ion-button slot="end" type="submit" [disabled]="!newUserForm.valid || isSame()" size="large">
            Submit
          </ion-button>
        </ion-item>
      </form>
    </ion-content> `,
  styles: ["ion-button { font-size: 1rem }"],
})
export class EditUserModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  @Input() displayName: string = "";
  private displayNameValidator: string;

  ngOnInit() {
    this.displayNameValidator = `${this.displayName}`;
  }

  onDismiss(newUserForm: NgForm) {
    if (newUserForm.valid && !this.isSame()) {
      const newUserData: EditUserModalData = {
        displayName: `${this.displayName}`,
      };
      this.modalController.dismiss(newUserData);
    }
  }

  onCancel() {
    this.modalController.dismiss(null);
  }

  isSame() {
    return this.displayName === this.displayNameValidator;
  }
}

export class EditUserModalData {
  displayName: string;
}
