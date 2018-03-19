import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NavigationService, FilterCareersService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-filter-career',
  templateUrl: 'filter-career.html',
})
export class FilterCareerPage {
  filter: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public filterCareersService: FilterCareersService,
    public viewCtrl: ViewController) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'FilterCareerPage';
  }

  goToPage(page: string, event: any): void {
    this.navCtrl.setRoot(page);
  }

  done() {
    this.viewCtrl.dismiss();
  }

  goBack() {
    this.filterCareersService.selectedCategory = null;
    this.navCtrl.push('MyCareersPage');
  }
}
