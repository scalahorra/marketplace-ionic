import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function matchFieldsValidator(field1: string, field2: string, fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valueField1 = control.get(field1)?.value;
    const valueField2 = control.get(field2)?.value;

    if (valueField1 !== valueField2) {
      control.get(field2)?.setErrors({ noFieldMatch: true })
      return { noFieldMatch: fieldName };
    } else {
      return null;
    }

  };
}