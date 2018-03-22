import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class OrganizationService {

  constructor(private http: Http) { }
  
  getOrganization(id: any): Observable<Model.Organization> {     
    return this.http.get('/organization/' + id)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return new Model.Organization(json.data);          
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}