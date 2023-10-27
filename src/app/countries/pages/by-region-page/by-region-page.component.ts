import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public isLoading: boolean = false;
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  searchByRegion(term: string) {
    this.isLoading = true;
    this.countriesService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
