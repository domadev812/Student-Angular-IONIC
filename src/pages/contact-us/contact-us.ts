import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ContactUsPage';
  }

}
