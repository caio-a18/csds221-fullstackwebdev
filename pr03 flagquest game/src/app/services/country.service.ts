import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Country } from '../game/country';

@Injectable()
export class CountryService {
  private countriesSubject: BehaviorSubject<Country[]> = new BehaviorSubject<
    Country[]
  >([]);
  public countries$: Observable<Country[]> =
    this.countriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  loadCountries() {
    this.http
      .get<Country[]>('../assets/countries.json')
      .subscribe((data) => this.countriesSubject.next(data));
  }
}
