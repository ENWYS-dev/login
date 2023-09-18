import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import cfg from '../config.json';
import { Login } from 'src/app/dtos/login';
import { LoginReturn } from 'src/app/dtos/login-retrun';
import { Observable } from 'rxjs';
import { Session } from '../dtos/session';
import { Redirect } from '../dtos/redirect';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = cfg.api + 'auth';
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    ) { }

  private httpOptions = {
    withCredentials: true
   };

  login(loginAuth:Login) : Observable<LoginReturn> {
    return this.httpClient.post<LoginReturn>(this.url + '/login', loginAuth, this.httpOptions);
  }

  logout() : Observable<any> {
    return this.httpClient.get<any>(this.url + '/logout', this.httpOptions);
  }

  session(type: string = '') : Observable<Session> {
    var typeLink = '';
    if(type) {
      typeLink = '?type=' + type;
    }
    return this.httpClient.get<Session>(this.url + '/session' + typeLink, this.httpOptions);
  }

  redirect(type: string = '') : Observable<Redirect> {
    var typeLink = '?link=intranet';
    if(type) {
      if(type == "auth" || "login") {
        typeLink = '?link=intranet';
      } else {
        typeLink = '?link=' + type;
      }
      
    }
    return this.httpClient.get<Redirect>(this.url + '/redirect' + typeLink, this.httpOptions);
  }
}
