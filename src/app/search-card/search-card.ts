import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface SearchResultEntry {
  archiveType: string;
  heading: string;
  photoUrl: string;
  type: string;
}

@Component({
  selector: 'app-search-card',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './search-card.html',
  styleUrl: './search-card.scss'
})
export class SearchCardComponent {
  @Input() entry!: SearchResultEntry;

  // ERR needs images to pass through the cropper service, according to the task at least?
  cropperServiceImageUrl(photoUrl: string, width?: number, height: number = 300): string {
    const encodeToUrl = encodeURIComponent(photoUrl); // deal with special characters in file names

    let cropperUrl = `https://arhiiv-img.err.ee/resize?type=optimize`;

    if (width) {
      cropperUrl += `&width=${width}`;
    }

    if (height) {
      cropperUrl += `&height=${height}`;
    }

    cropperUrl += `&file=${encodeToUrl}`;
    return cropperUrl;
  }
}
