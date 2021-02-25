import { Injectable } from '@angular/core';
import {SharedService} from './shared.service';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sharedService: SharedService, private loginService: LoginService) { }

  roleBaseAuth(): boolean {
    if (this.loginService.currentUserValue) {
      this.sharedService.getUser(localStorage.getItem('JWToken')).subscribe((res: any) => {
        const auth = res.authorities.some(x => x.name === 'ROLE_ADMIN');
        if (res.authorities && auth) {
          return true;
        }
      });
    }
    return false;
  }

}
