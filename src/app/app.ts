import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from './timeline/timeline';
import { EntryCardComponent } from './entry-card/entry-card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TimelineComponent,
    EntryCardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'jupiter-snippet';
}
