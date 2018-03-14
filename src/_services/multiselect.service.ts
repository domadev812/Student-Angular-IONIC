import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MultiSelectUtil } from '../_utils/multiselect.util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class MultiselectService {
  public schoolsSelect: MultiSelectUtil.SelectItem[];  
  
  constructor(private http: Http) {

   }

  getDropdownSchools(): Observable<MultiSelectUtil.SelectItem[]> {
    if (this.schoolsSelect) {
      return Observable.of(this.schoolsSelect);
    } else {
      return this.http.get('/organization/schools?limit=2000')
      .map((response: Response) => {
        const json = response.json();
        if (json && json.data) {
          this.schoolsSelect = MultiSelectUtil.SelectItem.buildFromData(json.data, 'School');
          return this.schoolsSelect;
        } else {
          Observable.throw({ message: 'Internal Server Error' });
        }
      });
    }
  }
}