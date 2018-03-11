import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, PrizesService, AuthService, CurrentUserService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-prizeshow',
  templateUrl: 'prizeshow.html',
})
export class PrizeShowPage {
  public prizeId: string;
  public prize: Model.Prize = new Model.Prize({});

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public prizesService: PrizesService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'PrizesShowPage';
  }

  ngOnInit() {
    this.prizeId = this.navParams.get('prizeId');
    this.prizeId = '2';
    this.prizesService.getPrize(this.prizeId).subscribe((res: Model.Prize) => {
      if (res) {
        this.prize = res;
      }
    }, err => console.log('There was an error', err));
  }


  goToRedeemPage(prizeId: string): void {
    this.navCtrl.push('PrizeRedeemPage', { prizeId: prizeId });
  }
}
