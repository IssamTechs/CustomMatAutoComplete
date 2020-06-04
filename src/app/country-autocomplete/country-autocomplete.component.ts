import {Component, forwardRef, HostListener, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {  Country } from '../models/country';
import {  CountryService } from '../services/country.service';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/Operators';
@Component({
  selector: 'app-country-autocomplete',
  template: `
  <mat-form-field style="width: 100%">
      <input type="text" matInput
      [formControl]="countryControl"
      [matAutocomplete]="auto">
      <mat-autocomplete #auto="matAutocomplete"  [displayWith]="displayFn"  (optionSelected)='onSelectionChanged($event)'>
      <mat-option *ngFor="let country of countries | async" [value]="country">
          {{ country.name}}
        </mat-option>
    </mat-autocomplete>
  </mat-form-field>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CountryAutocompleteComponent),
    multi: true
  }]
})
export class CountryAutocompleteComponent implements OnInit, ControlValueAccessor {
  countries: Observable<Country[]>;
  countryControl = new FormControl();
  // call when the value changes
  onChange: (val: number) => void;

  // we will call for any user action with the control
  onTouched: () => void;

  constructor(private service: CountryService) {

  }

  ngOnInit() {
    this.countries = this.countryControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.service.search(term)
    ));
  }

  onSelectionChanged(event) {
    this.value = +event.option.value.id;
  }

  private _value = 0;

  get value() {
    return this._value;
  }

  // set a new value and report this form
  set value(value: number) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  // response to the host element click, we tell the form that the control was "touched"
  @HostListener('click') click() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  // the form will call if the value has changed externally
  writeValue(obj: any): void {
    this.value = +obj;
  }

  // save callback for changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // save callback for "touches"
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  displayFn(country: Country): string {
    return country &&  country.name  ? `${country.name}`  : '';
  }
}
