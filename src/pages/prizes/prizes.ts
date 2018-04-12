import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, PrizesService, AuthService, CurrentUserService, AlertService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';
import { ImageUtil } from '../../_utils/image.util';

@IonicPage()
@Component({
  selector: 'page-prizes',
  templateUrl: 'prizes.html',
})

export class PrizesPage {
  @ViewChild(Content)
  content: Content;

  prizesList: Model.Prize[];
  limit = 24;
  offset = 0;
  infinite: any;
  balancePoints = 0;
  isScrolled = false;
  title = 'Prizes';
  loading: boolean;
  public imageUrlCreate = ImageUtil.createImageUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public prizesService: PrizesService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public alert: AlertService,
    public zone: NgZone,

  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'PrizesPage';
  }

  ngOnInit() {
    this.loading = true;
    this.getCurrentUser();
    this.getPrizes();
  }

  onPageScroll(data) {
    this.zone.run(() => {
      if (data.scrollTop > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.content.ionScroll) {
      this.content.ionScroll.subscribe((data) => {
        this.onPageScroll(data);
      });
    }
  }

  reset(): void {
    this.limit = 24;
    this.offset = 0;
    if (this.infinite) this.infinite.enable(true);
  }

  getCurrentUser(): void {
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.balancePoints = res.points;
    }, err => {
      this.alert.handleError(err);
    });
  }

  getPrizes(): void {
    this.reset();
    this.prizesService.getPrizes().subscribe((res: Model.Prize[]) => {
      this.loading = false;
      this.prizesList = res;
      this.offset = res.length;
    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  doInfinite(infiniteScroll: any): void {
    this.prizesService.getPrizes(this.offset, this.limit).subscribe((res: Model.Prize[]) => {
      this.offset += res.length;
      this.prizesList = this.prizesList.concat(res);
      this.infinite = infiniteScroll;
      infiniteScroll.complete();
      if (res.length < this.limit) infiniteScroll.enable(false);
    }, err => {
      this.alert.handleError(err);
    });
  }

  goToDetailPage(prizeId: string, points: number): void {
    this.navCtrl.push('PrizeShowPage', { prizeId: prizeId, prize_points: points, user_balance: this.balancePoints });
  }
}
