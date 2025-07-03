import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-entry-card',
  imports: [NgOptimizedImage],
  templateUrl: './entry-card.html',
  styleUrl: './entry-card.scss'
})
export class EntryCardComponent {
  @Input() entry: any;
}
