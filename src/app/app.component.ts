import {Component, OnInit} from '@angular/core';
import {WebsocketServiceService} from './websocket-service.service';
import {SharedService} from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private shared: SharedService) {
  }

  ngOnInit(): void {
  }
}
