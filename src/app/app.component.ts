import { Component } from '@angular/core';
import { FloodItRequest } from './floodit.model';
import { FloodItApiService } from './flooditapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  verbose = false;
  request: FloodItRequest = new FloodItRequest(this.verbose);
  origRequest: FloodItRequest = new FloodItRequest(this.verbose);

  get boardSize(): number { return this.request.state.board_size; }
  get board(): string[][] { return this.request.state.board; }
  get colors(): string[] { return this.request.state.colors; }

  constructor(private svc: FloodItApiService) {
    this.reset(true);
  }

  select_color(colorIdx: number) {
    this.svc.color(this.verbose, colorIdx, this.request.state).subscribe(r => {
      this.request = r;
      console.debug('ctor: r=', r);
    });
  }

  reset(newGame: boolean) {
    if (newGame) {
      this.svc.reset(this.verbose).subscribe(r => this.setRequest(r));
    } else {
      this.setRequest(this.origRequest);
    }
  }

  setRequest(r: FloodItRequest) {
    this.request = r;

    if (r.state.move === 0) {
      this.origRequest = new FloodItRequest(this.verbose, r);
      console.debug('origRequest', this.origRequest);
    }

    console.debug('request', this.request);

    this.request.messages = this.origRequest.messages = [];
  }
}
