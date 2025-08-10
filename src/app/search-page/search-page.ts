import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form';
import { SearchCardComponent } from '../search-card/search-card';
import { CommonModule } from '@angular/common';
import { MediaType } from 'express';

// ideally these interfaces should be models and the receiver function should be a service
// but im a little low on time as this is due Aug 12
// if i have time later, will refactor, if not, remember to explain in README.md or to the ERR reviewrs
// ideally this should look like how the Timeline component works (jupiter-api-mode, timeline-data)
interface SearchResultModel {
  archiveType: string;
  heading: string;
  photoUrl: string;
  type: string;
  // url: string;
  // seriesLabel: string;
}

interface MediaTypeDataModel {
  data: SearchResultModel[];
  label: string;
  // totalCount: number;
  // type: string;
}

@Component({
  selector: 'app-search-page',
  imports: [SearchFormComponent, SearchCardComponent, CommonModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPageComponent {
  searchData: any = null;
  processedResults: MediaTypeDataModel[] = [];

  onSearchResultsReceived(results: any) { // gets data from the search form
    this.searchData = results;
    this.processedResults = this.processSearchResults(results);
    console.log('Processed search results:', this.processedResults);
  }

  processSearchResults(apiResponse: any): MediaTypeDataModel[] {
    if (!apiResponse?.activeList?.data) {
      return [];
    }

    return apiResponse.activeList.data.map((mediaType: any) => ({
      data: mediaType.data.map((item: any) => ({
        archiveType: item.archiveType,
        heading: item.heading,
        photoUrl: item.photoUrl,
        type: item.type,
        // url: item.url,
        // seriesLabel: item.seriesLabel
      })),
      label: mediaType.label,
    }));
  }

  hasValidImage(photoUrl: string): boolean {
    return !!photoUrl?.trim(); // since the UI will use a photo always, if there isn't one (or its invalid), halt in search-page.html
  }
}
