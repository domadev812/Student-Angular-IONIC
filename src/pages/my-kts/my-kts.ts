import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';
@IonicPage()
@Component({
  selector: 'page-my-kts',
  templateUrl: 'my-kts.html',
})
export class MyKtsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'MyKtsPage';
  }
  
  goToPage(page: string): void {
    this.navCtrl.push(page);
  }

}
