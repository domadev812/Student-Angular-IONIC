import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class PrizesService {

  constructor(private http: Http) { }
  
  getPrizes(offset = 0, limit = 12): Observable<Model.Prize[]> {    
    return this.http.get('/prizes?offset=' + offset + '&limit=' + limit)
      .map((response: Response) => {
        const json = response.json();        
        if (json && json.data) {          
          return Model.initializeArray(json.data, 'Prize');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}