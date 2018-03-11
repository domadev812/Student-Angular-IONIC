import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, PrizesService, AddressService } from '../../../app/app.services.list';
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
    public prizesService: PrizesService,
    public addressService: AddressService,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'OrderReviewPage';
  }

  ngOnInit() {
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
  }

  getAddress(): void {    
    this.addressService.getAddress().subscribe((res: Model.Address[]) => {
      if (res.length > 0) {
        this.address = res[0];                
      }   
    }, err => console.log('There was an error', err));
  }

  placeOrder(): void {
    this.prizesService.redeemPrize(this.prizeId).subscribe((res: boolean) => {
      alert('Prize is redeemed successfully'); 
      this.navCtrl.push('PrizesPage');    
    }, err => {      
      alert(err.message);
      this.navCtrl.push('PrizesPage');    
    });
  }
}
