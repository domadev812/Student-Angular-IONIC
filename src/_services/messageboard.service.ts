import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MultiSelectUtil } from '../_utils/multiselect.util';
import { Observable } from 'rxjs/Observable';
import { Model } from '../app/app.models';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageBoardService {
  constructor(private http: Http) {}

  getMessage(): Observable<Model.MessageBoard> {
    return this.http.get('/messageboard').map((response: Response) => {
      const json = response.json();
      if (json) {
        return new Model.MessageBoard(json.data[0]);
      } else {
        throw Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }
}
