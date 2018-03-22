import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class AddressService {

  constructor(private http: Http) { }
  
  createAddress(address: Model.Address): Observable<Model.Address> {    
    return this.http.post('/address', address)
      .map((response: Response) => {
        const json = response.json();        
        if (json) {          
          return new Model.Address(json);
        } else {
          Observable.throw({ messages: 'Internal Server Error', response });
        }
      });
  }

  updateAddress(address: Model.Address): Observable<Model.Address> {    
    return this.http.patch('/address/' + address.id, address)
      .map((response: Response) => {
        const json = response.json();        
        if (json) {          
          return new Model.Address(json);
        } else {
          Observable.throw({ messages: 'Internal Server Error', response });
        }
      });
  }

  getAddress(offset = 0, limit = 20): Observable<Model.Address[]> {    
    return this.http.get('/address?offset=' + offset + '&limit=' + limit)
      .map((response: Response) => {
        const json = response.json();        
        if (json && json.data) {          
          return Model.initializeArray(json.data, 'Address');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}