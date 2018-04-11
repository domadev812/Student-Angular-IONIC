import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';
import { AuthService, CurrentUserService } from '../app/app.services.list';

@Injectable()
export class OpportunitiesService {

  constructor(
    private http: Http,
    private authProvider: AuthService,
    private currentUserService: CurrentUserService
  ) { }
  
  getOpportunities(type: string = '', my_filter: boolean, search: string = '', offset = 0, limit = 20): Observable<Model.Opportunity[]> {
    let filter_condition = '';
    if (search.length > 0)  search = '&search=' + search;
    if (my_filter) filter_condition = '&my_filter=true';
    if (type.length > 0)  type = '&type=' + type;
    return this.http.get('/opportunities?offset=' + offset + '&limit=' + limit + search + type + filter_condition)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return Model.initializeArray(json.data, 'Opportunity');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  getOpportunity(id: any): Observable<Model.Opportunity> {     
    return this.http.get('/opportunity/' + id)
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          return new Model.Opportunity(json.data);          
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }
  
  applyOpportunity(id: any): Observable<boolean> {     
    return this.http.post('/opportunities/' + id + '/apply', {})
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