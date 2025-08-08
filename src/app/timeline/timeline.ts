import { Component, OnInit } from '@angular/core';
import { EntryCardComponent } from '../entry-card/entry-card';
import { NgxSplideModule } from 'ngx-splide';
import { TimelineDataService } from './timeline-data';
import { JupiterApiModel } from './jupiter-api-model';

interface TimelineData {
  header: string;
  cardImageUrl: string[];
  captionEt: string[];
}

@Component({
  selector: 'app-timeline',
  imports: [
    EntryCardComponent,
    NgxSplideModule
  ],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss'
})

export class TimelineComponent implements OnInit {
  public timelines: TimelineData[] = [];

  splideOptions = {
    type: 'slide',
    perPage: 6,
    perMove: 6,
    pagination: false,
    arrows: true,
    padding: '2rem',
    gap: '0.5rem',
    breakpoints: {
      1280: {
        perPage: 5,
        perMove: 5,
      },
      1024: {
        perPage: 4,
        perMove: 4,
      },
      768: {
        perPage: 3,
        perMove: 3,
        padding: '1.5rem',
      },
      480: {
        perPage: 2,
        perMove: 2,
      }
    }
  };

  constructor(private readonly timelineDataService: TimelineDataService) { }
  ngOnInit(): void {
    this.loadTimelineData();
  }

  private loadTimelineData(): void {
    this.timelineDataService.getTimelineData().subscribe((api: JupiterApiModel) => {
      const frontPageItems = api.data.category.frontPage;
      this.timelines = frontPageItems
        .filter(this.isValidTimeline)
        .map(this.mapToTimelineData);
      // console.log(this.timelines);
    });
  }


  private isValidTimeline(item: any): boolean {
    return item.highTimeline === true && item.data.length > 0; // edge case where an entry called "MyFrenchFilmFestival" had an empty array
  }

  private mapToTimelineData(item: any): TimelineData {
    const cardImageUrl = item.data
      .map((dataItem: any) => dataItem.verticalPhotos?.[0]?.photoUrlBase)
      .filter((url: string) => {
        try {
          new URL(url); // in case the response is somehow not a URL
          return true;
        } catch {
          return false;
        }
      });

    const captionEt = item.data
      .map((dataItem: any) => dataItem.verticalPhotos?.[0]?.captionEt ?? '')

    const header = item.header;
    return { header, cardImageUrl, captionEt };
  }
}