import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class NotificationsService {

  constructor(private http: Http) { }

  getNotifications(search: string = '', offset = 0, limit = 20): Observable<Model.Notifications[]> {
    if (search.length > 0) search = '&search=' + search;
    return this.http.get('/notifications?offset=' + offset + '&limit=' + limit + search)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return Model.initializeArray(json.data, 'Notification');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }


}