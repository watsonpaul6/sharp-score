import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "../../services/user-auth/user-auth.service";
import { PopoverController } from "@ionic/angular";
import { HeaderPopoverComponent } from "../header-popover.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() text = "";
  @Input() hideLogin: boolean;
  @Input() hideMenuButton: boolean;
  constructor(private userAuth: UserAuthService, private router: Router, private popoverController: PopoverController) {}

  public get user$() {
    return this.userAuth.userInfo$;
  }
  ngOnInit() {
    this.hideLogin = this.hideLogin !== undefined;
    this.hideMenuButton = this.hideMenuButton !== undefined;
  }

  onClickLogin() {
    this.router.navigate(["/login"]);
  }

  async onClickLogout() {
    await this.userAuth.signOut();
    this.router.navigate(["/home"]);
  }

  async onClickUserMenu(ev) {
    let popovermenu = await this.popoverController.create({
      component: HeaderPopoverComponent,
      translucent: true,
      showBackdrop: false,
      event: ev,
    });
    await popovermenu.present();
  }
}
