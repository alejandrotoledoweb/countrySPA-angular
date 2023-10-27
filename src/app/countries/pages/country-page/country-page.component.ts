import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  public isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesSerive: CountriesService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   console.log({ params: id });
    //   this.searchCountry(id);
    // });
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesSerive.searchCountryByAlphaCode(id))
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        this.country = country;
        console.warn('tenemos un país');
        this.isLoading = false;
        return;
      });
  }

  // searchCountry(code: string) {
  //   this.countriesSerive.searchCountryByAlphaCode(code).subscribe((country) => {
  //     console.log(country);
  //   });
  // }
}
