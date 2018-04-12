import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, ContactUsService, CurrentUserService, AuthService, AlertService } from '../../app/app.services.list';
import { MultiSelectUtil } from '../../_utils/multiselect.util';
import { Model } from '../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  categoryList: Object[] = [{ itemName: 'Prize Problems', id: 1 },
                            { itemName: 'Scholarships', id: 2 },
                            { itemName: 'Internships', id: 3 },
                            { itemName: 'Opportunities', id: 4 },
                            { itemName: 'Sponsorship', id: 5 },
                            { itemName: 'General KTS Questions', id: 6 },
                            { itemName: 'Other', id: 7 }];
  selectedCategory: Object[] = [];
  ktsSelectSettings: Object = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public contactUsService: ContactUsService,
    public alert: AlertService,
    public currentUserService: CurrentUserService,
    public authProvider: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.fullName = (res.first_name || '') + ' ' + (res.last_name || '');
      if (res.phone_number) this.phoneNumber = res.phone_number;
    });
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({ text: ' ' });
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ContactUsPage';
  }

  sendMessage(valid: boolean): void {
    if (!valid || this.selectedCategory.length === 0) {
      return;
    }
    let data = {
      name: this.fullName,
      email: this.email,
      phone_number: this.phoneNumber,
      category: this.selectedCategory[0]['itemName'],
      message: this.message
    };
    this.contactUsService.sendData(data).subscribe((res: boolean) => {
      this.alert.toast('Message sent successfully.');
    }, err => {
      this.alert.handleError(err);
    });
  }

  onCategorySelect(item): void {
  }
}
