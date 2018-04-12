import { Component } from '@angular/core';
import { FilterCareersService, AlertService, CareersService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

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
    private inAppBrowser: InAppBrowser,
    public filterCareersService: FilterCareersService,    
    public alert: AlertService,
    public careerService: CareersService) {
  }

  ngOnInit() {
    this.selectedCategory = this.filterCareersService.selectedCategory; 
    this.type = this.filterCareersService.type; 
    if (!this.selectedCategory) {
      this.selectedCategory = new Model.CareerGroup();      
    }       
    if (this.type === 'personality') {
      this.filterTitle = 'Select a personality type';
      this.getPersonalityList();
    } else {
      this.filterTitle = 'Select a career type';      
      this.getCareerGroupList();
    }    
  }

  getPersonalityList(): void {
    this.careerService.getPersonalities().subscribe((res: Model.CareerGroup[]) => {      
      this.categoryList = res;             
    }, err => {
      this.alert.handleError(err);
    });
  }

  getCareerGroupList(): void {
    this.careerService.getCareerGroups().subscribe((res: Model.CareerGroup[]) => {      
      this.categoryList = res;       
    }, err => {
      this.alert.handleError(err);
    });
  }

  filterCategory(category: any): void {
    if (this.selectedCategory.id === category.id) {
      return;
    }
    this.selectedCategory = new Model.CareerGroup(category);    
    this.filterCareersService.categoryChange(this.selectedCategory);
  }

  openWebpage(url: string): void {
    this.inAppBrowser.create(url, '_self', {});
  }
}
