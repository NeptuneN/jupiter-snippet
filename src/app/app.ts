import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from './timeline/timeline';
import { TimelineDataService } from './timeline/timeline-data';
import { JupiterApiModel } from './timeline/jupiter-api-model';

interface TimelineData {
  header: string;
  cardImageUrl: string[];
  captionEt: string[];
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TimelineComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected title = 'jupiter-snippet';

  public timelines: TimelineData[] = [];

  // moved timeline component data fetch as to not make as many requests as there are timelines
  // ideally this should all be done in a main page component, i.e "front page" or "home", if this were more than a snippet project
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
    });
    console.log(this.timelines); // network log test
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