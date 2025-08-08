import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page';
import { TimelineComponent } from './timeline/timeline';

export const routes: Routes = [
    { path: '', component: TimelineComponent },
    { path: 'search', component: SearchPageComponent },
];
