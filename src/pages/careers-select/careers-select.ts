import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilterCareersService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-careers-select',
  templateUrl: 'careers-select.html',
})
export class CareersSelectPage {
  public type: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterCareersService: FilterCareersService) {
  }

  ngOnInit() {    
    this.type = this.navParams.get('type');
    if (!this.type) {
      this.type = 'categories';
    }
    // this.type = 'personality';
    this.filterCareersService.type = this.type;    
  }
}
