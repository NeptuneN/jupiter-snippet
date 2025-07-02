import { Component, Input } from '@angular/core';
import { EntryCardComponent } from '../entry-card/entry-card';

@Component({
  selector: 'app-timeline',
  imports: [EntryCardComponent],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss'
})
export class TimelineComponent{
  @Input () timeline: any;
}