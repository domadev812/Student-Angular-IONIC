import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-my-careers',
  templateUrl: 'my-careers.html',
})
export class MyCareersPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'MyCareersPage';
  }
  

}
