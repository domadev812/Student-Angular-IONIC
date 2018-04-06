import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  redirectUrl: string;
  loading: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navigationService: NavigationService
  ) {
  }
  ngOnInit() {
    this.navigationService.currentPage = 'LoginPage';
  }

  ionViewDidEnter(): void {
    if (this.navParams.get('redirectUrl')) {
      this.redirectUrl = this.navParams.get('redirectUrl');
    }
  }

}
