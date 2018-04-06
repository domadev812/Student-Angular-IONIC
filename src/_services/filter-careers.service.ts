import { Injectable, EventEmitter } from '@angular/core';

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