import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketServiceService} from '../websocket-service.service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import {LoginService} from '../services/login.service';
import {Subscription} from 'rxjs';
import {StompSubscription} from '@stomp/stompjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy{
  user: any;
  sub: StompSubscription;

  constructor(private webSocketService: WebsocketServiceService,
              private router: Router, private shared: SharedService,
              private loginService: LoginService){
    const stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {
      this.sub = stompClient.subscribe('/topic/notification', notifications => {
        console.log('test', notifications );
      });
    });
  }

  logOut() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }


  ngOnInit(): void {
    this.shared.getUser(localStorage.getItem('JWToken')).subscribe(res => {
      this.user = res;
      console.log('test', this.user );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
