import { Component, Input } from '@angular/core';
import { EntryCardComponent } from '../entry-card/entry-card';
import { NgxSplideModule } from 'ngx-splide';

@Component({
  selector: 'app-timeline',
  imports: [
    EntryCardComponent,
    NgxSplideModule
  ],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss'
})
export class TimelineComponent {
  @Input() timeline: any;

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
      },
      480: {
        perPage: 2,
        perMove: 2,
      }
    }
  };
}