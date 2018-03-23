import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Model } from '../app/app.models';

@Injectable()
export class CareersService {
  careersEvent: EventEmitter<any> = new EventEmitter<any>();
  userCareers: Model.Career[];

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

  getPersonalities(): Observable<Model.CareerGroup[]> {
    return this.http.get('/personalities')
      .map((response: Response) => {
        const json = response.json();           
        if (json && json.data) {
          return Model.initializeArray(json.data, 'CareerGroup');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  } 

  getCareers(): Observable<Model.Career[]> {
    return this.http.get('/careers')
      .map((response: Response) => {
        const json = response.json();           
        if (json && json.data) {
          return Model.initializeArray(json.data, 'Career');
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  addUserCareers(ids: any[]): Observable<boolean> {
    return this.http.post('/add-careers', {career_ids: ids})
      .map((response: Response) => {
        const json = response.json();        
        if (json && json.data) {
          return true;         
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
  }

  setUserCareers(careers: Model.Career[]) {
    this.userCareers = careers.map(career => career);
  }

  getUserCareers(): Model.Career[] {
    return this.userCareers ? this.userCareers : [];
  }

  careersChange(): void {
    this.careersEvent.emit(this.userCareers);
  }
}