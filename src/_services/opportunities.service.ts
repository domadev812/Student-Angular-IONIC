import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class OpportunitiesService {

  constructor(private http: Http) { }
  
  getOpportunities(type: string = '', search: string = '', offset = 0, limit = 20): Observable<Model.Opportunity[]> {
    if (search.length > 0)  search = '&search=' + search;
    if (type.length > 0)  type = '&type=' + type;
    return this.http.get('/opportunities?offset=' + offset + '&limit=' + limit + search + type)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return Model.initializeArray(json.data, 'Opportunity');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }


}