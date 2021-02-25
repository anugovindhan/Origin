import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketServiceService} from '../websocket-service.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {StompSubscription} from '@stomp/stompjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public notifications = 0;
  public mess: any;
  sub: StompSubscription;

  constructor(private webSocketService: WebsocketServiceService, private router: Router,
              private shared: SharedService, private loginService: LoginService){

    const stompClient = this.webSocketService.connect();
    const token = localStorage.getItem('JWToken');
    stompClient.connectHeaders = {Authorization: 'Bearer ' + token};

    stompClient.connect({}, frame => {
        this.sub = stompClient.subscribe('/topic/notification', notifications => {
        this.mess = notifications.body;
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    }
  ngOnInit(): void {

  }

  clickToConnect() {
    this.shared.connect(localStorage.getItem('JWToken')).subscribe(res => {
      console.log(res);
    });
  }

  logOut() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

}
