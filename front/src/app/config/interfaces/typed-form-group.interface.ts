import {FormGroup} from '@angular/forms';

export class FormGroupTyped<T> extends FormGroup {
    // @ts-ignore
  public get value(): T {
        return this.value;
    }
}

export type FormFields<T> = Record<keyof T, any>;
