import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  private fullName: string;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService
  ) {
  }

  ngOnInit() {
    this.fullName = 'Full Name';
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ContactUsPage';
  }

  onChange(event): void {
  }

  sendMessage(valid: boolean): void {
  }
}
