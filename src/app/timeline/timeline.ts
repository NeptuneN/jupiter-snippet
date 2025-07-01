import { Component, OnInit } from '@angular/core';
import { EntryCardComponent } from '../entry-card/entry-card';
import { TimelineDataService } from './timeline-data';
import { JupiterApiModel } from './jupiter-api-model';

@Component({
  selector: 'app-timeline',
  imports: [EntryCardComponent],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss'
})
export class TimelineComponent implements OnInit {
  public timelineData: any[] = [];

  constructor(private timelineDataService: TimelineDataService) { }

  // ngOnInit(): void {
  //   this.timelineDataService.getTimelineData().subscribe((api: JupiterApiModel) => {
  //     api.data.category.frontPage
  //       .filter((item) => item.highTimeline === true)
  //       .forEach((item) => {
  //         console.log(item.data.verticalPhotos[0].photoUrlOriginal);
  //       });
  //   });
  // }

  ngOnInit(): void {
    this.timelineDataService.getTimelineData().subscribe((api: JupiterApiModel) => {
      // console.log(data.data.category.frontPage[0].data[0]);
      // console.log(data);
      console.log(api.data.category.frontPage[1].data[3]);
      console.log(api.data.category.frontPage[1].data[3].verticalPhotos[0].photoUrlOriginal);
      // reminder of red herrings at frontpage0 and frontpage1
      // todo: filter out specific highTimeline items, only need the verticalPhotos and timeline title
    });
  }
}
