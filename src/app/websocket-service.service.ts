import {Injectable} from '@angular/core';
import SockJs from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  connect() {
    const token = localStorage.getItem('JWToken');
    // tslint:disable-next-line:max-line-length
    // const socket = new SockJs(`http://localhost:5000/socket`, null, {transports: ['xhr-streaming'], headers: {'Authorization': 'Bearer ' + token}});
    const socket = new SockJs(`http://localhost:5000/socket`);
    return Stomp.over(socket);
  }
}
