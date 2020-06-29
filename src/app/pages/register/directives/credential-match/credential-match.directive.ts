import { Directive } from "@angular/core";
import { ValidatorFn, FormGroup, ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: "[appCredentialMatch]",
  providers: [{ provide: NG_VALIDATORS, useExisting: CredentialMatchDirective, multi: true }],
})
export class CredentialMatchDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): ValidationErrors {
    return credentialMatchValidator(control);
  }
}

export const credentialMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const email = control.get("email");
  const cEmail = control.get("cEmail");
  const password = control.get("password");
  const cPassword = control.get("cPassword");

  let credentialMatchResult = {
    emailMismatch: email?.value !== cEmail?.value,
    passwordMismatch: password?.value !== cPassword?.value,
  };

  return email?.value !== cEmail?.value || password?.value !== cPassword?.value ? credentialMatchResult : null;
};
