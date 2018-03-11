import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class PrizesService {

  constructor(private http: Http) { }

  getPrizes(offset = 0, limit = 24): Observable<Model.Prize[]> {
    return this.http.get('/prizes/available?offset=' + offset + '&limit=' + limit)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return Model.initializeArray(json.data, 'Prize');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  redeemPrize(id: any): Observable<boolean> {     
    return this.http.post('/prizes/' + id + '/redeem', {})
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return true;         
        } else {
          Observable.throw({ messages: 'Internal Server Error', response });
        }
      });
  }
  
  getPrize(id: any): Observable<Model.Prize> {
    return this.http.get(`/prizes/${id}/student`)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return new Model.Prize(json.data);
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}