import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FilterCareersService {
  selectedCategory: any;
  type: string;
  categoryEvent: EventEmitter<any> = new EventEmitter<any>();
  categoryChange(selectedCategory): void {
    this.selectedCategory = selectedCategory;    
    this.categoryEvent.emit(this.selectedCategory);
  }
}