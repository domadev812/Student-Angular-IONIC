import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';
import { AuthService, CurrentUserService } from '../app/app.services.list';

@Injectable()
export class ScholarshipsService {

  constructor(
    private http: Http,
    private authProvider: AuthService,
    private currentUserService: CurrentUserService
  ) { }

  getScholarships(my_filter: boolean, school_id: number, search: string = '', offset = 0, limit = 20): Observable<Model.Scholarship[]> {
    let filter_condition = '';
    if (my_filter) {
      filter_condition = '&my_filter=true';
    }
    if (school_id) {
      filter_condition += '&school_id=' + school_id;
    }
    if (search.length > 0) search = '&search=' + search;
    return this.http.get('/scholarships?offset=' + offset + '&limit=' + limit + search + filter_condition)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
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
          this.currentUserService.getCurrentUser(this.authProvider, true);
          return true;
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
}