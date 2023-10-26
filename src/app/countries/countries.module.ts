import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByRegionPageComponent,
    ByCountryPageComponent,
    CountryPageComponent,
    SearchBoxComponent,
    CountryTableComponent,
  ],
  exports: [SearchBoxComponent],
  imports: [CommonModule, CountriesRoutingModule, SharedModule],
})
export class CountriesModule {}
