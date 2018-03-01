import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-progress-tracker',
  templateUrl: 'progress-tracker.html',
})
export class ProgressTrackerPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService
  ) {
  }
  
  ionViewCanEnter() {
    this.navService.currentPage = 'ProgressTrackerPage';
  }

}
