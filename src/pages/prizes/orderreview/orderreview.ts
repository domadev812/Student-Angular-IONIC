import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { NavigationService, PrizesService, AddressService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { ImageUtil } from '../../../_utils/image.util';

@IonicPage()
@Component({
  selector: 'page-orderreview',
  templateUrl: 'orderreview.html',
})
export class OrderReviewPage {
  public prizeId: string;
  public prizePoints: number;
  public balancePoints: number;
  public redeemedPoints: number;
  public address: Model.Address;
  public prize: Model.Prize = new Model.Prize({});
  public imageUrlCreate = ImageUtil.createImageUrl;
  public loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public prizesService: PrizesService,
    public addressService: AddressService,
    public alert: AlertService,
    public viewCtrl: ViewController,
    public app: App
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'OrderReviewPage';
  }

  ngOnInit() {
    this.loading = true;
    this.address = new Model.Address();
    this.prizeId = this.navParams.get('prizeId');
    this.prizePoints = this.navParams.get('prize_points');
    if (!this.prizePoints) {
      this.prizePoints = 0;
    }
    this.balancePoints = this.navParams.get('user_balance');
    if (!this.balancePoints) {
      this.balancePoints = 0;
    }
    this.redeemedPoints = this.balancePoints - this.prizePoints;
    this.getAddress();
    this.getPrize();
  }

  getPrize() {
    this.prizesService.getPrize(this.prizeId).subscribe((res: Model.Prize) => {
      if (res) {
        this.prize = res;
      }
    }, err => {
      this.alert.handleError(err);
    });
  }

  getAddress(): void {
    this.addressService.getAddress().subscribe((res: Model.Address[]) => {
      if (res.length > 0) {
        this.address = res[0];
        this.loading = false;
      }
    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  placeOrder(): void {
    this.prizesService.redeemPrize(this.prizeId).subscribe((res: boolean) => {
      this.alert.toast('Prize is redeemed successfully');
      this.navCtrl.push('PrizesPage');
    }, err => {
      this.alert.handleError(err);
      this.navCtrl.push('PrizesPage');
    });
  }

  goBack() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.goToPage('MyKtsPage', null);
    }
  }

  goToPage(page: string, event: any): void {
    this.app.getActiveNavs()[0].setRoot(page);
    this.dismissIfPopover();
  }

  dismissIfPopover() {
    if (this.viewCtrl.isOverlay) {
      this.viewCtrl.dismiss();
    }
  }
}
