import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ContactUsService {

  constructor(private http: Http) { }
  
  sendData(data: Object): Observable<boolean> {        
    return this.http
      .post('https://script.google.com/macros/s/AKfycbxjBom6n-uPxjMyVsdH8BNb9J_Ev92CmwmsciOitSeYi98rEtAu/exec', data, null)
      .map((response: Response) => {
        const json = response.json();        
        if (json && json.result === 'success') {
          return true;
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}