import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class NotificationsService {
  constructor(private http: Http) {}

  getNotifications(limit: string = '', offset: string = ''): Observable<Model.Notification[]> {
    limit = '?limit=' + limit;
    offset = '&offset=' + offset;
    let url = '/notifications' + limit + offset;
    return this.http.get(url).map((response: Response) => {
      const json = response.json();
      if (json && json.data) {
        return Model.initializeArray(json.data, 'Notification');
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

  getParentNotifications(
    token: string = '',
    limit: string = '',
    offset: string = ''
  ): Observable<Model.Notification[]> {
    token = '?token=' + token;
    limit = '&limit=' + limit;
    offset = '&offset=' + offset;
    let url = '/notifications/parent' + token + limit + offset;
    return this.http.get(url).map((response: Response) => {
      const json = response.json();

      if (json && json.data) {
        return Model.initializeArray(json.data, 'Notification');
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

  getNotification(id: string): Observable<Model.Notification> {
    return this.http.get('/notifications/' + id).map((response: Response) => {
      const json = response.json();
      if (json && json.data) {
        return new Model.Notification(json.data);
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }
}
