import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountryAutocompleteComponent } from './country-autocomplete/country-autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './services/country.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule , ReactiveFormsModule, BrowserAnimationsModule,
     MatAutocompleteModule, MatFormFieldModule, HttpClientModule, MatInputModule],
  declarations: [ AppComponent, CountryAutocompleteComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    CountryService
  ]
})
export class AppModule { }
