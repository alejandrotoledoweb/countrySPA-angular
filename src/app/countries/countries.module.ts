import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByRegionPageComponent,
    ByCountryPageComponent,
    CountryPageComponent,
    SearchBoxComponent,
  ],
  imports: [CommonModule, CountriesRoutingModule],
  exports: [SearchBoxComponent],
})
export class CountriesModule {}
