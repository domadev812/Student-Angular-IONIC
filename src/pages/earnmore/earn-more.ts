import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-earn-more',
  templateUrl: 'earn-more.html',
})
export class EarnMorePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'EarnMorePage';
  }

}
