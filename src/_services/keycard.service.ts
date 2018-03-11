import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class KeycardService {
  constructor(private http: Http) { }


  redeemCode(keycard: string): Observable<Model.Keycard> {
    return this.http.patch('/keycard/' + keycard + '/redeem', {}).map((response: any) => {
      const json = response.json();
      if (json && json.data) {
        return json.data;
      } else {
        Observable.throw({ message: 'Internal Server Error' });
      }
    });
  }

}