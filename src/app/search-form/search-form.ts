import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface QueryParamsModel {
  phrase: string;
  type: 'all' | 'photo' | 'video' | 'audio';
  sortOption: 'accuracy' | 'old' | 'new' | 'abc';
  page: number;
  limit: number;
  timeRange: 'all' | 'week' | 'month' | 'year' | 'custom';
  timeRangeFrom: number | null;
  timeRangeTo: number | null;
  includeTranscription: boolean; // this does nothing? the CURL response body doesn't change regardless of this value
  advancedParams: any[]; // what is this even for?
}

@Component({
  selector: 'app-search-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss'
})
export class SearchFormComponent {
  @Output() searchResults = new EventEmitter<any>(); // pass from child (the form) to parent (the page)

  searchQuery = '';
  selectedType: 'all' | 'photo' | 'video' | 'audio' = 'photo';
  selectedSort: 'accuracy' | 'old' | 'new' | 'abc' = 'accuracy';
  selectedTimeRange: 'all' | 'week' | 'month' | 'year' | 'custom' = 'all';
  includeTranscription = false;

  constructor(private http: HttpClient) { }

  onSearch() {
    if (!this.searchQuery.trim()) {
      alert('Otsing ei saa olla tühi!'); // simple UX feedback
      return;
    }
    const url = '/api/v1/search';
    // const url = 'https://arhiiv.err.ee/api/v1/search'; have to use proxy url above because CORS when testing locally
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const queryParams: QueryParamsModel = {
      phrase: this.searchQuery,
      type: this.selectedType,
      sortOption: this.selectedSort,
      page: 1,
      limit: 20,
      timeRange: this.selectedTimeRange,
      timeRangeFrom: null,
      timeRangeTo: null,
      includeTranscription: this.includeTranscription,
      advancedParams: []
    };

    this.http.post(url, { queryParams }, { headers })
      .subscribe({
        next: (response) => {
          console.log('Search result:', response);
          this.searchResults.emit(response);
        },
        error: (err) => {
          alert('API error: ' + (err.message || 'Unknown error')); // added because i get 429 errors too often
          console.error('API error:', err);
        }
      });
  }
}