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
    return this.http.get('/opportunities/' + id)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return new Model.Opportunity(json.data);          
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}