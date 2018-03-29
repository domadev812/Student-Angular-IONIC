import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as Service from '../../app/app.services.list';
import { AlertService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-key-redemption',
  templateUrl: 'key-redemption.html'
})
export class KeyRedemptionPage {

  confirmation = false;
  points = 0;

  constructor(
    private navCtrl: NavController,
    private authService: Service.AuthService,
    private currentUserService: Service.CurrentUserService,
    private navService: Service.NavigationService,
    private keycardService: Service.KeycardService,
    public alert: AlertService
  ) {
  }

  ngOnInit() {
    this.updatePoints();
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'KeyRedemptionPage';
  }

  updatePoints(): void {
    this.currentUserService.getCurrentUser(this.authService, true).then((res) => {
      if (res.points) {
        this.points = res.points;
      }
      this.currentUserService.pointsChange();
    }).catch((a) => console.log(a));
  }

  submitKeycard(keycode): void {
    this.keycardService.redeemCode(keycode).subscribe((response) => {
      this.updatePoints();
      this.alert.toast('Keycard successfully redeemed');
    }, err => {
      this.alert.handleError(err);
    });
  }

  goToPage(page: string): void {
    this.navCtrl.push(page);
  }

}
