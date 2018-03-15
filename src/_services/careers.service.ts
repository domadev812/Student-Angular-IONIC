import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class CareersService {

  constructor(private http: Http) { }

  getCareerGroups(): Observable<Model.CareerGroup[]> {
    return this.http.get('/career-group')
      .map((response: Response) => {
        const json = response.json();           
        if (json && json.data) {
          return Model.initializeArray(json.data, 'CareerGroup');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }  
}