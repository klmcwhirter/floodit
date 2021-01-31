import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FloodItRequest, FloodItState } from './floodit.model';

@Injectable({
  providedIn: 'root'
})
export class FloodItApiService {

  constructor(private httpClient: HttpClient) { }

  color(verbose: boolean, idx: number, state: FloodItState): Observable<FloodItRequest> {
    const model = {
      __type__: 'color',
      color: idx,
      state: state,
      verbose: verbose
    } as FloodItRequest;
    const req = new FloodItRequest(verbose, model);

    console.debug('FloodItApiService.color: req=', req);

    return this.httpClient.put<FloodItRequest>(
      '/floodit/api/flooditapi',
      req
    );
  }

  reset(verbose: boolean): Observable<FloodItRequest> {
    const req = {
      '__type__': 'reset',
      verbose: verbose
    };

    console.debug('FloodItApiService.reset: req=', req);

    return this.httpClient.put<FloodItRequest>(
      '/floodit/api/flooditapi',
      req
    );
  }
}
