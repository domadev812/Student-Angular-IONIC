import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FilterService {
  newScholarshipEvent: EventEmitter<any> = new EventEmitter<any>();
  myScholarships: boolean;
  scholarshipUniversity;
  constructor(private http: Http) { }


  scholarshipFilterChange() {
    const scholarshipFilters = {
      myScholarships: this.myScholarships,
      scholarshipUniversity: this.scholarshipUniversity
    };
    this.newScholarshipEvent.emit(scholarshipFilters);
  }



}