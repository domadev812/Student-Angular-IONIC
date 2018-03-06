import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class CareersService {

  constructor(private http: Http) { }

  getOpportunity(id: any): Observable<Model.Opportunity> {     
    return this.http.get('/opportunity/' + id)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return new Model.Opportunity(json.data);          
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  applyOpportunity(id: any): Observable<boolean> {     
    return this.http.post('/opportunities/' + id + '/apply', {})
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return true;         
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}