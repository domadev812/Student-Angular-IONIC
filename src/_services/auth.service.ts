import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { CurrentUserService } from '../app/app.services.list';
import { Model } from '../app/app.models';
import { App } from 'ionic-angular';
import { ENV } from '../config/config.dev';

@Injectable()
export class AuthService {
  url: string = ENV.API_URL;
    
  constructor(
    private currentUserService: CurrentUserService,
    private http: Http,
    private app: App
  ) {}

    public authenticated() {
      return tokenNotExpired('Token');
    }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('/auth', {
      email: email,
      password: password,
    }).map((response: Response) => {
      const json = response.json() as API.Response.Auth;
      if (json.token && json.user) {
        return this.currentUserService.set(json.token, json.user);
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

  logout() {
    this.currentUserService.destroy();
    this.app.getRootNav().setRoot('LoginPage');
  }

  getCurrentUser(): Observable<Model.User> {
    return this.http.get('/users/me')
    .map((response: Response) => {
      const user = new Model.User(response.json().data);
      if (user.email) {
        return user;
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

  signup(params: Model.User): Observable<boolean> {
    return this.http.post('/users', params)
    .map((response: Response) => {
      const json = response.json();
      if (json && json.auth_token) {
        return this.currentUserService.set(json.auth_token, json);
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

  requestResetToken(data: ForgotPassword.IForgot): Observable<ForgotPassword.Response> {
    return this.http.post(this.url + '/forgot', data)
    .map( (response: Response) => {
      if (response.json()) {
        return response.json();
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

  verifyResetToken(data: ForgotPassword.IVerify): Observable<ForgotPassword.Response> {
    return this.http.post(this.url + '/verify-token', data)
    .map( (response: Response) => {
      if (response.json()) {  
       return response.json();
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      } 
    });
  }

  resetPassword(data: ForgotPassword.IChangePassword): Observable<ForgotPassword.Response> {
    return this.http.post(this.url + '/reset-password', data)
    .map( (response: Response) => {
      if (response.json()) {
        return response.json();
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }



}
