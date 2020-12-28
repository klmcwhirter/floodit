import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FloodItRequest, FloodItState } from './floodit.model';

@Injectable({
  providedIn: 'root'
})
export class FloodItApiService {

  constructor(private httpClient: HttpClient) { }

  color(idx: number, state: FloodItState): Observable<FloodItRequest> {
    const req = {
      '__type__': 'req',
      color: idx,
      state: state
    } as FloodItRequest;

    return this.httpClient.put<FloodItRequest>(
      '/api/flooditapi',
      req
    );
  }

  reset(): Observable<FloodItRequest> {
    const req = {
    } as FloodItRequest;

    return this.httpClient.put<FloodItRequest>(
      '/api/flooditapi',
      req
    );
  }
}
