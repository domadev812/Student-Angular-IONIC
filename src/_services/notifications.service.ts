import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class NotificationsService {

  constructor(private http: Http) { }

  getNotifications(): Observable<Model.Notifications[]> {
    return this.http.get('/notifications')
      .map((response: Response) => {
        const json = response.json();
        
        if (json && json.data) {
          return Model.initializeArray(json.data, 'Notifications');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  getNotification(id: string): Observable<Model.Notifications> {
    return this.http.get('/notifications/' + id)
      .map((response: Response) => {
        const json = response.json();        
        if (json && json.data) {
          return new Model.Notifications(json.data);
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}