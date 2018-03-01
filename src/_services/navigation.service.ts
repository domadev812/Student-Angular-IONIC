import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavigationService {
  public currentPage: string;
  public HOME = 'MyKtsPage';
  public LOGIN = 'LoginPage';

  constructor(private http: Http) { }

}