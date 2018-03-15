import { Component } from '@angular/core';
import { FilterCareersService, AlertService, CareersService } from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';
import { Model } from '../../../app/app.models';

@Component({
  selector: 'filter-careers',
  templateUrl: 'filter-careers.html'
})
export class FilterCareersWidgetComponent {
  categoryList: any;
  selectedCategory: Model.CareerGroup;  
  type: string;
  filterTitle: string;
  constructor(
    public filterCareersService: FilterCareersService,    
    public alert: AlertService,
    public careerService: CareersService) {
  }

  ngOnInit() {
    this.selectedCategory = this.filterCareersService.selectedCategory; 
    this.type = this.filterCareersService.type;    

    if (this.type === 'personality') {
      this.filterTitle = 'Select a personality type';
      this.getPersonalityList();
    } else {
      this.filterTitle = 'Select a career type';
      this.selectedCategory = new Model.CareerGroup();
      this.selectedCategory.id = 3;
      this.getCareerGroupList();
    }    
  }

  getPersonalityList(): void {

  }

  getCareerGroupList(): void {
    this.careerService.getCareerGroups().subscribe((res: Model.CareerGroup[]) => {      
      this.categoryList = res;       
    }, err => {
      this.alert.handleError(err);
    });
  }
}
