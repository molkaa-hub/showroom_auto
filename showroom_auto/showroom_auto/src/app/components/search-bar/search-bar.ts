import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnChanges {
  faMagnifyingGlass = faMagnifyingGlass;
  @Input() autos: Auto[] = [];
  @Output() onSelectCar = new EventEmitter<Auto>();
  selectedAutos: Auto[] = [];
  searchTerm = '';
  activeBrand = 'All cars';
  brands: string[] = ['All cars', 'Mercedes Benz', 'BMW', 'Audi', 'Jaguar', 'Land Rover', 'Alfa Romeo'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['autos']) this.applyFilters();
  }

  selectAutos(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  filterBrand(brand: string): void {
    this.activeBrand = brand;
    this.applyFilters();
  }

  clearSearch(input: HTMLInputElement): void {
    input.value = '';
    this.searchTerm = '';
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.activeBrand = 'All cars';
    this.applyFilters();
  }

  selectCar(auto: Auto): void { this.onSelectCar.emit(auto); }

  private applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.selectedAutos = this.autos.filter(auto => {
      const matchesBrand = this.activeBrand === 'All cars' || auto.brand === this.activeBrand;
      const matchesTerm = !term || `${auto.brand} ${auto.model}`.toLowerCase().includes(term);
      return matchesBrand && matchesTerm;
    });
  }
}
