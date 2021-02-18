import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) { }
  login(data): Observable<any> {
    const url = this.apiUrl + '/authenticate';
    return this.http.post(url, data);
  }
  getUser(token) {
    const url = this.apiUrl + '/user';
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: header});
  }
}
