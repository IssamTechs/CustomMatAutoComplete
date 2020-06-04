import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <div style="margin: 0 auto; width: 350px">
      <form [formGroup]="form" *ngIf="form">
        <legend>Reactive Forms</legend>
        <app-country-autocomplete
          formControlName="countryId">
        </app-country-autocomplete>
        <p>form value: {{form.value | json}}</p>
      </form>
    </div>`
})
export class AppComponent {
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      countryId: new FormControl(213)
    });
   }
}
