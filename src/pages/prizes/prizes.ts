import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, PrizesService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';
@IonicPage()
@Component({
  selector: 'page-prizes',
  templateUrl: 'prizes.html',
})
export class PrizesPage {
  prizesList: Model.Prize[];
  limit = 20;
  offset = 0;
  infinite: any;
  imageTest = ['https://image.ibb.co/b8di2n/logo1.png',
               'https://image.ibb.co/itpsTS/logo2.png',
               'https://image.ibb.co/iGWZa7/logo3.png'];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public prizesService: PrizesService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'PrizesPage';
  }

  ngOnInit() {
    this.getPrizes();
  }

  reset(): void {
    this.limit = 20;
    this.offset = 0;    
    if (this.infinite) this.infinite.enable(true);
  }

  getPrizes(): void {
    this.reset();
    this.prizesService.getPrizes().subscribe((res: Model.Prize[]) => {
      this.prizesList = res;
      this.offset = res.length;
      console.log(res.length);
    }, err => console.log('There was an error', err));
  }

  doInfinite(infiniteScroll: any): void {
    this.prizesService.getPrizes(this.offset, this.limit).subscribe((res: Model.Prize[]) => {
      this.prizesList = this.prizesList.concat(res);
        this.infinite = infiniteScroll;
        infiniteScroll.complete();
        if (res.length < this.limit) infiniteScroll.enable(false);
    }, err => console.log('There was an error', err));
  }
}
