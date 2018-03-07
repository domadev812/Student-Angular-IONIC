import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class ScholarshipsService {

  constructor(private http: Http) { }
  
  getScholarships(search: string = '', offset = 0, limit = 20): Observable<Model.Scholarship[]> {
    if (search.length > 0)  search = '&search=' + search;
    return this.http.get('/scholarships?offset=' + offset + '&limit=' + limit + search)
      .map((response: Response) => {
        const json = response.json();        
        if (json && json.data) {
          console.log('this is scholarship', json.data);
          return Model.initializeArray(json.data, 'Scholarship');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  getScholarship(id: any): Observable<Model.Scholarship> {     
    return this.http.get('/scholarships/' + id)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return new Model.Scholarship(json.data);          
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  applyScholarship(id: any, data: Object): Observable<boolean> {     
    return this.http.post('/scholarships/' + id + '/apply', data)
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