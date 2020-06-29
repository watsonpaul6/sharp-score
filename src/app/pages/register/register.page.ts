import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserAuthService } from "src/app/core/services/user-auth/user-auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  email: string;
  cEmail: string;

  password: string;
  cPassword: string;
  constructor(private userAuth: UserAuthService) {}

  ngOnInit() {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid || registerForm.hasError("emailMismatch") || registerForm.hasError("passwordMismatch")) {
      return;
    }

    this.userAuth.registerWithEmailPassword(this.email, this.password);
  }
}
