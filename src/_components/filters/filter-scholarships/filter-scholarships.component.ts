import { Component } from '@angular/core';
import { FilterService, MultiselectService } from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';

@Component({
  selector: 'filter-scholarships',
  templateUrl: 'filter-scholarships.html'
})
export class FilterScholarshipsComponent {
  myScholarships: any;
  universityList: Object[] = [];
  selectedUniversity: Object[] = [];
  ktsSelectSettings: Object = {};

  constructor(
    public filterService: FilterService,
    private multiselectService: MultiselectService) {

  }

  ngOnInit() {
    this.myScholarships = this.filterService.myScholarships;
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({text: ' '});
    this.multiselectService.getDropdownSchools().subscribe((res) => {
      this.universityList = res;
    }, err => {
      console.log('err', err);
    });
  }

  myScholarshipsToggle(value): void {
    this.filterService.myScholarships = value;
    this.filterService.scholarshipFilterChange();
  }

  onUniversitySelect(item): void {
    this.filterService.scholarshipUniversity = item;
    this.filterService.scholarshipFilterChange();
  }


}
