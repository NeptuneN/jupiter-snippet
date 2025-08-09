import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [SearchFormComponent, CommonModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPageComponent {
  searchData: any = null;

  onSearchResultsReceived(results: any) { // gets data from the search form
    this.searchData = results;
    console.log('Search results received:', this.searchData);
  }
}
