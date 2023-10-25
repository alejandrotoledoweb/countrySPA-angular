import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/countries.interface';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log({ error });
        return of([]);
      })
    );
    // tap((countries) => console.log('paso por el tap', countries)));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log({ error });
        return of([]);
      })
    );
    // tap((countries) => console.log('paso por el tap', countries)));
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log({ error });
        return of([]);
      })
    );
    // tap((countries) => console.log('paso por el tap', countries)));
  }
}
