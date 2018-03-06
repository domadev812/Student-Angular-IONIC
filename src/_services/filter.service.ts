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
  newInternshipEvent: EventEmitter<any> = new EventEmitter<any>();
  myInternships: boolean;
  newOpportunityEvent: EventEmitter<any> = new EventEmitter<any>();
  myOpportunities: boolean;
  constructor(private http: Http) { }


  scholarshipFilterChange(): void {
    const scholarshipFilters = {
      myScholarships: this.myScholarships,
      scholarshipUniversity: this.scholarshipUniversity
    };
    this.newScholarshipEvent.emit(scholarshipFilters);
  }

  internshipFilterChange(): void {
    const internshipFilters = {
      myInternships: this.myInternships
    };
    this.newInternshipEvent.emit(internshipFilters);
  }

  opportunityFilterChange(): void {
    const opportunityFilters = {
      myOpportunities: this.myOpportunities
    };
    this.newOpportunityEvent.emit(opportunityFilters);
  }





}