import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Country } from '../models/country';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get('assets/countries.json')
    .pipe(map((x: Country[]) => x.filter(l =>
      l.name.toLocaleLowerCase().includes(query.toString().toLocaleLowerCase()))));
  }
}
