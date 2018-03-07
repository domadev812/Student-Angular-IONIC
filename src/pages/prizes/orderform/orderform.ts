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

  validationPhone(): boolean {
    let regPattern = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/; //USA Phone number
    //^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$   All Country
    return regPattern.test(this.phoneNumber);
  }

  gotoNext(valid: boolean): void {
    console.log(this.validationPhone());
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
