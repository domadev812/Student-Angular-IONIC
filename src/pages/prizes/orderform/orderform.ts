import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { NavigationService, AddressService, AuthService, CurrentUserService, AlertService } from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-orderform',
  templateUrl: 'orderform.html',
})
export class OrderFormPage {
  prizeId: string;
  stateList: Object[] = [{ itemName: 'AL - Alabama', state: 'AL', id: 1 },
  { itemName: 'AK - Alaska', state: 'AK', id: 2 },
  { itemName: 'AZ - Arizona', state: 'AZ', id: 3 },
  { itemName: 'AR - Arkansas', state: 'AR', id: 4 },
  { itemName: 'CA - California', state: 'CA', id: 5 },
  { itemName: 'CO - Colorado', state: 'CO', id: 6 },
  { itemName: 'CT - Conneticut', state: 'CT', id: 7 },
  { itemName: 'DE - Deleware', state: 'DE', id: 8 },
  { itemName: 'DC - District of Columbia', state: 'DC', id: 9 },
  { itemName: 'FL - Florida', state: 'FL', id: 10 },
  { itemName: 'GA - Georgia', state: 'GA', id: 11 },
  { itemName: 'HI - Hawaii', state: 'HI', id: 12 },
  { itemName: 'ID - Idaho', state: 'ID', id: 13 },
  { itemName: 'IL - Illinois', state: 'IL', id: 14 },
  { itemName: 'IN - Indiana', state: 'IN', id: 15 },
  { itemName: 'IA - Iowa', state: 'IA', id: 16 },
  { itemName: 'KS - Kansas', state: 'KS', id: 17 },
  { itemName: 'KY - Kentucky', state: 'KY', id: 18 },
  { itemName: 'LA - Lousiana', state: 'LA', id: 19 },
  { itemName: 'ME - Maine', state: 'ME', id: 20 },
  { itemName: 'MD - Maryland', state: 'MD', id: 21 },
  { itemName: 'MA - Massachusetts', state: 'MA', id: 22 },
  { itemName: 'MI - Michigan', state: 'MI', id: 23 },
  { itemName: 'MN - Minnesota', state: 'MN', id: 24 },
  { itemName: 'MS - Mississippo', state: 'MS', id: 25 },
  { itemName: 'MO - Missouri', state: 'MO', id: 26 },
  { itemName: 'MT - Montana', state: 'MT', id: 27 },
  { itemName: 'NE - Nebraska', state: 'NE', id: 28 },
  { itemName: 'NV - Nevada', state: 'NV', id: 29 },
  { itemName: 'NH - New Hampshire', state: 'NH', id: 30 },
  { itemName: 'NJ - New Jersey', state: 'NJ', id: 31 },
  { itemName: 'NM - New Mexico', state: 'NM', id: 32 },
  { itemName: 'NY - New York', state: 'NY', id: 33 },
  { itemName: 'NC - North Carolina', state: 'NC', id: 34 },
  { itemName: 'ND - North Dakota', state: 'ND', id: 35 },
  { itemName: 'OH - Ohio', state: 'OH', id: 36 },
  { itemName: 'OK - Oklahoma', state: 'OK', id: 37 },
  { itemName: 'OR - Oregon', state: 'OR', id: 38 },
  { itemName: 'PA - Pennsylvania', state: 'PA', id: 39 },
  { itemName: 'RI - Rhode Island', state: 'RI', id: 40 },
  { itemName: 'SC - South Carolina', state: 'SC', id: 41 },
  { itemName: 'SD - South Dakota', state: 'SD', id: 42 },
  { itemName: 'TN - Tennessee', state: 'TN', id: 43 },
  { itemName: 'TX - Texas', state: 'TX', id: 44 },
  { itemName: 'UT - Utah', state: 'UT', id: 45 },
  { itemName: 'VT - Vermont', state: 'VT', id: 46 },
  { itemName: 'VA - Virginia', state: 'VA', id: 47 },
  { itemName: 'WA - Washington', state: 'WA', id: 48 },
  { itemName: 'WV - West Virginia', state: 'WV', id: 49 },
  { itemName: 'WI - Wisconsin', state: 'WI', id: 50 },
  { itemName: 'WY - Wyoming', state: 'WY', id: 51 }];
  selectedState: Object[] = [];
  ktsSelectSettings: Object = {};
  address: Model.Address;
  loading: boolean;
  fullName: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public addressService: AddressService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public alert: AlertService,
    public viewCtrl: ViewController,
    public app: App
  ) {
  }

  ngOnInit() {
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({ text: 'Select State' });
    this.prizeId = this.navParams.get('prizeId');
    this.address = new Model.Address();
    this.getAddress();
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.fullName = res.getName();
    });
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'OrderFormPage';
  }

  validationPhone(): boolean {
    let regPattern = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/; //USA Phone number
    //^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$   All Country
    return regPattern.test(this.address.phone_number);
  }

  validationZipCode(): boolean {
    if (!this.address.zip_code || this.address.zip_code.length !== 5) {
      return false;
    }
    return true;
  }

  getAddress(): void {
    this.addressService.getAddress().subscribe((res: Model.Address[]) => {
      if (res.length > 0) {
        this.address = res[0];
        let savedState = this.stateList.find(state => state['state'] === this.address.state);
        if (savedState) {
          this.selectedState.push(savedState);
        }
      }
    }, err => {
      this.alert.handleError(err);
    });
  }

  gotoNext(valid: boolean): void {
    if (!valid || !this.validationPhone()) {
      return;
    }

    if (this.selectedState.length === 0 || !this.validationZipCode()) {
      return;
    }
    this.address.state = this.selectedState[0]['state'];
    this.address.address_two = '';
    let prizePoints = this.navParams.get('prize_points');
    let balancePoints = this.navParams.get('user_balance');
    if (!this.address.id) {
      this.addressService.createAddress(this.address).subscribe((res: Model.Address) => {
        this.navCtrl.push('OrderReviewPage', { prizeId: this.prizeId, prize_points: prizePoints, user_balance: balancePoints });
      }, err => {
        this.alert.handleError(err);
      });
    } else {
      this.addressService.updateAddress(this.address).subscribe((res: Model.Address) => {
        this.navCtrl.push('OrderReviewPage', { prizeId: this.prizeId, prize_points: prizePoints, user_balance: balancePoints });
      }, err => {
        this.alert.handleError(err);
      });
    }
  }

  onStateSelect(item): void {
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
