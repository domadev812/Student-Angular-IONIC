import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Service from '../../app/app.services.list';
import { Model } from '../../app/app.models';
import { AuthService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-key-redemption',
  templateUrl: 'key-redemption.html',
})
export class KeyRedemptionPage {

    confirmation = false;
    points = 0;
    keycode = '';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private authService: Service.AuthService,
    private currentUserService: Service.CurrentUserService,
    private navService: Service.NavigationService,
    private keycardService: Service.KeycardService
  ) {
  }

  ngOnInit() {
    this.updatePoints();
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'KeyRedemptionPage';
  }

  updatePoints(): void {
    let user = this.currentUserService.getCurrentUser(this.authService).then((res) => {
      this.points = res.points;
    }).catch((a) => console.log(a));
  }

  submitKeycard(keycode): void {
    this.keycardService.redeemCode(keycode).subscribe((response) => {
      this.updatePoints();
      this.keycode = '';
    }, err => {
      this.confirmation = err.message;
      setTimeout(() => {
        this.confirmation = false;
        this.updatePoints();
      }, 3000);
    });
  }
  
  goToPage(page: string): void {
    this.navCtrl.push(page);
  }

}
