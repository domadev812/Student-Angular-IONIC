import { Component } from '@angular/core';
import { FilterService, MultiselectService, AlertService } from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';

@Component({
  selector: 'filter-scholarships',
  templateUrl: 'filter-scholarships.html'
})
export class FilterScholarshipsComponent {
  myScholarships: any;
  scholarshipUniversity: any;
  universityList: Object[] = [];
  selectedUniversity: Object[] = [];
  ktsSelectSettings: Object = {};

  constructor(
    public filterService: FilterService,
    private multiselectService: MultiselectService,
    public alert: AlertService) {

  }

  ngOnInit() {
    this.myScholarships = this.filterService.myScholarships;
    this.scholarshipUniversity = this.filterService.scholarshipUniversity;
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({ text: ' ' });
    this.multiselectService.getDropdownSchools().subscribe((res) => {
      this.universityList = res;
      if (this.scholarshipUniversity) {
        this.selectedUniversity.push(this.scholarshipUniversity);
      }
    }, err => {
      this.alert.handleError(err);
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
  onUniversityDeSelect(item): void {
    this.filterService.scholarshipUniversity = null;
    this.filterService.scholarshipFilterChange();
  }
}
