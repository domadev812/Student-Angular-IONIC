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
  stateList: Object[] = [{ itemName: 'AL - Alabama', id: 1, minValue: '35801', maxValue: '35816' }, 
                         { itemName: 'AK - Alaska', id: 2, minValue: '99501', maxValue: '99524' },
                         { itemName: 'AZ - Arizona', id: 3, minValue: '85001', maxValue: '85055' },
                         { itemName: 'AR - Arkansas', id: 4, minValue: '72201', maxValue: '72217' },
                         { itemName: 'CA - California', id: 5, minValue: '94203', maxValue: '94209' },
                         { itemName: 'CO - Colorado', id: 6, minValue: '80201', maxValue: '80239' },
                         { itemName: 'CT - Conneticut', id: 7, minValue: '06101', maxValue: '06112' },
                         { itemName: 'DE - Deleware', id: 8, minValue: '19901', maxValue: '19905' }, 
                         { itemName: 'DC - District of Columbia', id: 9, minValue: '20001', maxValue: '20020' },
                         { itemName: 'FL - Florida', id: 10, minValue: '32501', maxValue: '32509' },
                         { itemName: 'GA - Georgia', id: 11, minValue: '30301', maxValue: '30381' },
                         { itemName: 'HI - Hawaii', id: 12, minValue: '96801', maxValue: '96830' },
                         { itemName: 'ID - Idaho', id: 13, minValue: '80201', maxValue: '80239' },
                         { itemName: 'IL - Illinois', id: 14, minValue: '60601', maxValue: '60641' },
                         { itemName: 'IN - Indiana', id: 15, minValue: '46201', maxValue: '46209' }, 
                         { itemName: 'IA - Iowa', id: 16, minValue: '52801', maxValue: '52809' }, 
                         { itemName: 'KS - Kansas', id: 17, minValue: '67201', maxValue: '67221' },
                         { itemName: 'KY - Kentucky', id: 18, minValue: '41701', maxValue: '41702' },
                         { itemName: 'LA - Lousiana', id: 19, minValue: '70112', maxValue: '70119' },
                         { itemName: 'ME - Maine', id: 20, minValue: '04032', maxValue: '04034' },
                         { itemName: 'MD - Maryland', id: 21, minValue: '21201', maxValue: '21237' },
                         { itemName: 'MA - Massachusetts', id: 22, minValue: '02101', maxValue: '02137' },
                         { itemName: 'MI - Michigan', id: 23, minValue: '49734', maxValue: '49735' }, 
                         { itemName: 'MN - Minnesota', id: 24, minValue: '55801', maxValue: '55808' },
                         { itemName: 'MS - Mississippo', id: 25, minValue: '39530', maxValue: '39535' },
                         { itemName: 'MO - Missouri', id: 26, minValue: '63101', maxValue: '63141' },
                         { itemName: 'MT - Montana', id: 27, minValue: '59044', maxValue: '59044' },
                         { itemName: 'NE - Nebraska', id: 28, minValue: '68901', maxValue: '68902' },
                         { itemName: 'NV - Nevada', id: 29, minValue: '89501', maxValue: '89513' },
                         { itemName: 'NH - New Hampshire', id: 30, minValue: '03217', maxValue: '03217' }, 
                         { itemName: 'NJ - New Jersey', id: 31, minValue: '07039', maxValue: '07039' },
                         { itemName: 'NM - New Mexico', id: 32, minValue: '87500', maxValue: '87506' },
                         { itemName: 'NY - New York', id: 33, minValue: '10001', maxValue: '10048' },
                         { itemName: 'NC - North Carolina', id: 34, minValue: '27565', maxValue: '27565' },
                         { itemName: 'ND - North Dakota', id: 35, minValue: '58282', maxValue: '58282' },
                         { itemName: 'OH - Ohio', id: 36, minValue: '44101', maxValue: '44179' },
                         { itemName: 'OK - Oklahoma', id: 37, minValue: '74101', maxValue: '74110' }, 
                         { itemName: 'OR - Oregon', id: 38, minValue: '97201', maxValue: '97225' },
                         { itemName: 'PA - Pennsylvania', id: 39, minValue: '15201', maxValue: '15244' },
                         { itemName: 'RI - Rhode Island', id: 40, minValue: '02840', maxValue: '02841' },
                         { itemName: 'SC - South Carolina', id: 41, minValue: '29020', maxValue: '29020' },
                         { itemName: 'SD - South Dakota', id: 42, minValue: '57401', maxValue: '57402' },
                         { itemName: 'TN - Tennessee', id: 43, minValue: '37201', maxValue: '37222' },
                         { itemName: 'TX - Texas', id: 44, minValue: '78701', maxValue: '78705' }, 
                         { itemName: 'UT - Utah', id: 45, minValue: '84321', maxValue: '84323' },
                         { itemName: 'VT - Vermont', id: 46, minValue: '05751', maxValue: '05751' },
                         { itemName: 'VA - Virginia', id: 47, minValue: '24517', maxValue: '24517' },
                         { itemName: 'WA - Washington', id: 48, minValue: '98004', maxValue: '98009' },
                         { itemName: 'WV - West Virginia', id: 49, minValue: '25813', maxValue: '25813' },
                         { itemName: 'WI - Wisconsin', id: 50, minValue: '53201', maxValue: '53228' },
                         { itemName: 'WY - Wyoming', id: 51, minValue: '82941', maxValue: '82941' }];
  selectedState: Object[] = [];
  ktsSelectSettings: Object = {};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService,
  ) {
  }

  ngOnInit() {       
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({text: 'Select State'});
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'OrderFormPage';
  }

  validationPhone(): boolean {
    let regPattern = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/; //USA Phone number
    //^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$   All Country
    return regPattern.test(this.phoneNumber);
  }

  validationZipCode(): boolean {  
    if (!this.zipCode) {
      return false;
    }    
    if (this.zipCode.length !== 5) {
      return false;
    }
    
    const minValue = this.selectedState[0]['minValue'];
    const maxValue = this.selectedState[0]['maxValue'];
    if (this.zipCode < minValue || this.zipCode > maxValue) {
      return false;
    }
    return true;
  }

  gotoNext(valid: boolean): void { 
           
    if (!valid || !this.validationPhone()) {
      return;
    }

    if (this.selectedState.length === 0 || !this.validationZipCode()) {
      return;
    }
    console.log('Create address');
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

  onStateSelect(item): void {    
  }
}
