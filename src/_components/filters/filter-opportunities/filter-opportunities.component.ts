import { Component } from '@angular/core';
import { FilterService } from '../../../app/app.services.list';

@Component({
  selector: 'filter-opportunities',
  templateUrl: 'filter-opportunities.html'
})
export class FilterOpportunitiesComponent {
  myOpportunities: any;

  constructor(
    public filterService: FilterService) {

  }

  ngOnInit() {
    this.myOpportunities = this.filterService.myOpportunities;
  }

  myOpportunitiesToggle(value): void {
    this.filterService.myOpportunities = value;
    this.filterService.opportunityFilterChange();
  }



}
