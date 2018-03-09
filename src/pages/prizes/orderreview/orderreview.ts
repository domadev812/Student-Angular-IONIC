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
  public prizePoints: number;
  public balancePoints: number;
  public redeemedPoints: number;
  public address: Model.Address;

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
    this.prizePoints = this.navParams.get('prize_points');      
    if (!this.prizePoints) {
      this.prizePoints = 0;
    } 
    this.balancePoints = this.navParams.get('user_balance');    
    if (!this.balancePoints) {
      this.balancePoints = 0;
    }
    this.redeemedPoints = this.balancePoints - this.prizePoints;
    this.address = new Model.Address(this.navParams.get('address'));        
  }

  placeOrder(): void {

  }
}
