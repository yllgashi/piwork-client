import { FormControl } from '@angular/forms';

export class EmailValidator {
  static checkEmail(control: FormControl): any {
    let checkEmail: boolean = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      control.value
    );
    return !checkEmail && control.value ? { invalidEmail: true } : null;
  }
}
