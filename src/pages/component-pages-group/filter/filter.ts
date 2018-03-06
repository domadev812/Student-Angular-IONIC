import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  filter: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public viewCtrl: ViewController) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'FilterPage';
  }

  ionViewDidEnter() {
    this.filter = this.navParams.get('filter');
  }

  goToPage(page: string, event: any): void {
    this.navCtrl.setRoot(page);
  }

  done() {
    this.viewCtrl.dismiss();
  }

}
