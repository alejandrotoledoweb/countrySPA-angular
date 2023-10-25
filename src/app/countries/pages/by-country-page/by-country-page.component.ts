import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  searchByCountry(term: string) {
    this.countriesService
      .searchCountry(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
