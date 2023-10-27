import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/countries.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      delay(2000),
      catchError(() => of([]))
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      delay(2000),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
    // tap((countries) => console.log('paso por el tap', countries)));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url);
    // tap((countries) => console.log('paso por el tap', countries)));
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url);
    // tap((countries) => console.log('paso por el tap', countries)));
  }
}
