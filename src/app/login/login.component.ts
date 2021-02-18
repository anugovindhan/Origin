import { Component, OnInit } from '@angular/core';
import {SharedService} from '../services/shared.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private returnUrl: string;
  private loading: boolean;
  error: any;
  constructor(private loginService: LoginService,
              private router: Router,
              private shared: SharedService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
    // reset login status
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
  }
  login() {
    this.loading = true;
    this.loginService.login(this.loginForm.getRawValue()).pipe(first())
      .subscribe(
        data => {
          this.shared.getUser(data.id_token).subscribe((res: any) => {
            let auth = res.authorities.some(x => x.name === 'ROLE_ADMIN');
            if (res.authorities && auth) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(['user']);
            }
          });
        },
        error => {
          this.loading = false;
          this.error = error.error.error;
          console.log(this.error);
        });
  }

}
