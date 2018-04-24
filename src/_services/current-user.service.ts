import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Model } from '../app/app.models';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Response } from '@angular/http';
import { AuthService } from '../app/app.services.list';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { FCM } from '@ionic-native/fcm';

@Injectable()
export class CurrentUserService {
  private currentUser: Model.User;
  private currentUserPromise: Promise<Model.User>;
  private notify = new Subject<any>();
  public pointsEvent: EventEmitter<any> = new EventEmitter<any>();

  token: string = undefined;
  jwtHelper: JwtHelper = new JwtHelper();
  fcm: FCM = new FCM();

  notifyObservable$ = this.notify.asObservable();
  constructor(private http?: Http) {
    this.http = http;
  }

  public authenticated() {
    return tokenNotExpired('Token');
  }

  load(user): void {
    if (this.currentUser === undefined || this.token === undefined) {
      this.token = window.localStorage.getItem('Token');
      if (user) {
        this.currentUser = user;
        this.emitUpdate();
      }
    }
    if (!this.token || this.currentUser === undefined || this.currentUser.roles === undefined) {
      this.destroy();
    }
  }

  // stores the promise it receives as a new variable
  getCurrentUser(authProvider: AuthService, force: boolean = false): Promise<Model.User> {
    let token = localStorage.getItem('Token');
    if (!this.currentUserPromise || force) {
      this.currentUserPromise = new Promise((resolve, reject) => {
        if (this.currentUser && !force) {
          resolve(this.currentUser);
        } else if (token) {
          authProvider.getCurrentUser().subscribe(
            (user: Model.User) => {
              this.load(user);
              if (user) {
                this.currentUser = user;
                this.emitUpdate();
                resolve(user);
              } else {
                reject();
              }
            },
            err => {
              reject(err);
            }
          );
        }
      });
    }
    return this.currentUserPromise;
  }

  hasCurrentUser(): boolean {
    return this.currentUser !== null;
  }

  set(token: string, user: any): boolean {
    window.localStorage.setItem('Token', token);
    let parsedUser = new Model.User(user);
    this.load(parsedUser);
    return this.authenticated();
  }

  destroy(): void {
    window.localStorage.clear();
    this.currentUser = undefined;
    this.token = null;
    this.currentUserPromise = undefined;
  }

  updateUser(params: Model.User, id: string): Observable<Model.User> {
    return this.http.patch('/users/' + id, params).map((response: Response) => {
      const json = response.json();

      if (json && json.data) {
        this.currentUser = new Model.User(json.data);
        return new Model.User(json.data);
      } else {
        Observable.throw({ message: 'Internal Server Error', response });
      }
    });
  }

  public emitUpdate() {
    this.notify.next(this.currentUser);
  }

  public getUserProgress(): Observable<Model.UserProgress> {
    return this.http.get('/users/progress').map((response: Response) => {
      const json = response.json();
      if (json && json.data) {
        return new Model.UserProgress(json.data);
      } else {
        Observable.throw({ message: 'Internal Server error', response });
      }
    });
  }

  changePassword(params: { password: string; password_confirmation: string; current_password: string }) {
    return this.http.patch(`/users/${this.currentUser.id}/change-password`, params).map((response: Response) => {
      const json = response.json();
      if (json) {
        return json;
      } else {
        Observable.throw({ message: 'Internal Server Error', response });
      }
    });
  }

  cancelAccount() {
    return this.http.delete(`/users/${this.currentUser.id}`, {}).map((response: Response) => {
      const json = response.json();
      if (json && json.data) {
        return json;
      } else {
        Observable.throw({ message: 'Internal Server Error', response });
      }
    });
  }

  setRegistrationToken(registration_token: string): Observable<boolean> {
    return this.http
      .post(`/users/${this.currentUser.id}/register`, { registration_token: registration_token })
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          this.watchNotifications();
          return true;
        } else {
          Observable.throw({ message: 'Internal Server Error', response });
        }
      });
  }

  getRegistrationToken(): Promise<string> {
    return this.fcm.getToken();
  }

  watchNotifications() {
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        // console.log('Received in background', data);
      } else {
        // console.log('Received in foreground', data);
      }
    });
  }

  pointsChange(): void {
    if (this.currentUser) {
      this.pointsEvent.emit(this.currentUser.points);
    } else {
      this.pointsEvent.emit(null);
    }
  }
}
