import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, PrizesService, AuthService, CurrentUserService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { ImageUtil } from '../../../_utils/image.util';

@IonicPage()
@Component({
  selector: 'page-prizeshow',
  templateUrl: 'prizeshow.html',
})
export class PrizeShowPage {
  public prizeId: string;
  public prize: Model.Prize = new Model.Prize({});
  public prizePoints: string;
  public imageUrlCreate = ImageUtil.createImageUrl;
  public loading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public prizesService: PrizesService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public alert: AlertService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'PrizesShowPage';
  }

  ngOnInit() {
    this.loading = true;
    this.prizeId = this.navParams.get('prizeId');
    this.prizesService.getPrize(this.prizeId).subscribe((res: Model.Prize) => {
      if (res) {
        this.prize = res;
        this.loading = false;
      }
    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  goToRedeemPage(prizeId: string): void {
    let prizePoints = this.navParams.get('prize_points');
    let balancePoints = this.navParams.get('user_balance');
    this.navCtrl.push('OrderFormPage', { prizeId: prizeId, prize_points: prizePoints, user_balance: balancePoints });
  }
}
