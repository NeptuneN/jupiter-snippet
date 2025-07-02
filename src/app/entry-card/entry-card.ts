import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entry-card',
  imports: [],
  templateUrl: './entry-card.html',
  styleUrl: './entry-card.scss'
})
export class EntryCardComponent {
  @Input() entry: any;
}
