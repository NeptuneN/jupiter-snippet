import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JupiterApiModel } from './jupiter-api-model';

@Injectable({
  providedIn: 'root'
})
export class TimelineDataService {
  private url = 'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';

  constructor(private http: HttpClient) { }

  getTimelineData(): Observable<JupiterApiModel> {
    return this.http.get<JupiterApiModel>(this.url);
  }
}