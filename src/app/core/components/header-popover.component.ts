import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "../services/user-auth/user-auth.service";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-header-popover",
  template: `
    <ion-list class="ion-text-center">
      <ion-list-header>
        <ion-label>
          <h1>
            User Options
          </h1>
        </ion-label>
      </ion-list-header>

      <ion-item button (click)="(null)" class="ion-text-right">
        <span slot="end">
          User profile
        </span>
      </ion-item>

      <ion-item button (click)="onEditDetails()" class="ion-text-right">
        <span slot="end">
          Edit user details
        </span>
      </ion-item>
      <ion-item button (click)="onSignOut()" lines="none">
        <span slot="end">
          Logout
        </span>
      </ion-item>
    </ion-list>
  `,
})
export class HeaderPopoverComponent implements OnInit {
  constructor(private userAuth: UserAuthService, private popoverController: PopoverController) {}

  ngOnInit() {}

  onSignOut() {
    this.userAuth.signOut();
    this.popoverController.dismiss();
  }

  onEditDetails() {
    this.userAuth.editUserDetails();
    this.popoverController.dismiss();
  }
}
