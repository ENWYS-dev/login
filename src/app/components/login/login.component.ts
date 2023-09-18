import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from 'src/app/dtos/login';
import { CookieService } from 'ngx-cookie-service';
import { LoginReturn } from 'src/app/dtos/login-retrun';
import cfg from '../../config.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService, 
    private cookieService: CookieService,
    private route: Router
  ) {}

  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginPasswordVisibility = false;
  loginError = '';

  loginUser() {
    this.loginError = '';
    if(this.login.get("username")?.value && this.login.get("password")?.value) {
      const auth: Login = new Login(this.login.controls.username.value || '', this.login.controls.password.value || '');

      this.authService.login(auth).subscribe(
        (loginReturn: LoginReturn) => {

          if(loginReturn.success) {
            this.cookieService.set("SESSION", loginReturn.sessionId, 120, undefined, "." + cfg.rootDomain, false, 'None');
            this.route.navigateByUrl('/redirect?link=' + loginReturn.redirect)
          } else {
            this.loginError = loginReturn.error;
          }

        }
      );
    } else {
      this.loginError = 'Usernam or Password not set';
    }
  }

  passwordChangeType() {
    if (this.loginPasswordVisibility) {
      this.loginPasswordVisibility = false;
    } else {
      this.loginPasswordVisibility = true;
    }
  }

}
