import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService} from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';
@IonicPage()
@Component({
  selector: 'page-orderform',
  templateUrl: 'orderform.html',
})
export class OrderFormPage {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  cityName: string;
  stateName: string;
  zipCode: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService,
  ) {
  }

  ngOnInit() {       
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'OrderFormPage';
  }

  gotoNext(valid: boolean): void {
    // if (!valid || this.selectedCategory.length === 0) {
    //   return;
    // }
    // let data = {
    //   name : this.fullName,
    //   phone_number: this.phoneNumber,
    //   category: this.selectedCategory[0]['itemName'],
    //   message: this.message
    // };
    // this.contactUsService.sendData(data).subscribe((res: boolean) => {
    //   alert('Send message successfully.');      
    // }, err => console.log('There was an error', err));    
  }
}
