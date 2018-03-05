import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';
import { MultiSelectUtil } from '../../_utils/multiselect.util';
@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  fullName: string;
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
    public navService: NavigationService
  ) {
  }

  ngOnInit() {   
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({text: ' '});     
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ContactUsPage';
  }

  sendMessage(valid: boolean): void {
  }

  onCategorySelect(item): void {    
  }
}
