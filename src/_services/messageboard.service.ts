import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Model } from '../app/app.models';


@Injectable()
export class MessageBoardService {

  constructor(private http: Http) {

  }

  getMessage(): Observable<Model.MessageBoard> {
    return this.http.get('/messageboard')
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data[0]) {
          return new Model.MessageBoard(json.data[0]);
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}