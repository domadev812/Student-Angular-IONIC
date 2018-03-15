import { Component } from '@angular/core';
import { FilterService, } from '../../../app/app.services.list';
@Component({
  selector: 'filter-internships',
  templateUrl: 'filter-internships.html'
})
export class FilterInternshipsComponent {
  myInternships: any;

  constructor(
    public filterService: FilterService,
  ) {

  }

  ngOnInit() {
    this.myInternships = this.filterService.myInternships;
  }

  myInternshipsToggle(value): void {
    this.filterService.myInternships = value;
    this.filterService.internshipFilterChange();
  }



}
