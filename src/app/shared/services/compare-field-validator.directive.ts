import { Directive, Input } from '@angular/core';
import { Validator, ValidationErrors, AbstractControl, NG_VALIDATORS, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appCompareFieldValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CompareFieldValidatorDirective,
    multi: true
  }]
})
export class CompareFieldValidatorDirective implements Validator {
  validate(controlGroup: FormGroup): ValidationErrors {
    const password = controlGroup.controls.password;
    const confirmPassword = controlGroup.controls.confirmPassword;
    if (password.value !== confirmPassword.value) {
      return {notEqual: true};
    }
    return null;
  }

  constructor() { }

}
