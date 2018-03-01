import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navigationService: NavigationService
  ) {
  }

  ngOnInit() {
    this.navigationService.currentPage = 'SignupPage';
  }


}
