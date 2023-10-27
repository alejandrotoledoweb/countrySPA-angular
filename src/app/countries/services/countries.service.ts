import { CacheStore } from './../interfaces/cache-store.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/countries.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }
  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

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
      // delay(2000),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => {
          this.cacheStore.byCapital = { term, countries }
        }),
        tap(() => this.saveToLocalStorage())
      )
    // tap((countries) => console.log('paso por el tap', countries)));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => {
          this.cacheStore.byCountry = { term, countries }
        }),
        tap(() => this.saveToLocalStorage())
      )
    // tap((countries) => console.log('paso por el tap', countries)));
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => {
          this.cacheStore.byRegion = { region, countries }
        }),
        tap(() => this.saveToLocalStorage())
      )
    // tap((countries) => console.log('paso por el tap', countries)));
  }
}
