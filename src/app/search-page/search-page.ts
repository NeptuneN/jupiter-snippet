import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form';
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
  imports: [SearchFormComponent, CommonModule],
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

  // ERR needs images to pass through the cropper service, according to the task at least?
  cropperServiceImageUrl(photoUrl: string, height: number = 300, width?: number): string {
    if (!photoUrl) {
      return ''; // since the UI will use a photo always, if there isn't one, halt here
    }

    const encodeToUrl = encodeURIComponent(photoUrl); // deal with special characters in file names

    let cropperUrl = `https://arhiiv-img.err.ee/resize?type=optimize&file=${encodeToUrl}`;

    if (height) {
      cropperUrl += `&height=${height}`;
    }

    if (width) {
      cropperUrl += `&width=${width}`;
    }

    return cropperUrl;
  }
  
  // hasValidImage(photoUrl: string) {
  //   return photoUrl && photoUrl.trim() !== '';
  // }
}
