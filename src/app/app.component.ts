import { Component } from '@angular/core';
import { FloodItRequest } from './floodit.model';
import { FloodItApiService } from './flooditapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  request: FloodItRequest = new FloodItRequest();

  get boardSize(): number { return this.request.state.board_size; }
  get board(): string[][] { return this.request.state.board; }
  get colors(): string[] { return this.request.state.colors; }

  constructor(private svc: FloodItApiService) {
    this.reset();
  }

  select_color(colorIdx: number) {
    this.svc.color(colorIdx, this.request.state).subscribe(r => this.request = r);
  }

  reset() {
    this.svc.reset().subscribe(r => this.request = r);
  }
}
