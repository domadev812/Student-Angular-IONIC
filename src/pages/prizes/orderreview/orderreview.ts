import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-orderreview',
  templateUrl: 'orderreview.html',
})
export class OrderReviewPage {  
  public prizeId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,    
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'OrderReviewPage';
  }

  ngOnInit() {        
    this.prizeId = this.navParams.get('prizeId');        
    this.prizeId = '9';    
  }
}
