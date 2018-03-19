import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, AuthService, CurrentUserService, CareersService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-my-careers',
  templateUrl: 'my-careers.html',
})
export class MyCareersPage {
  currentUser: Model.User;
  title: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public careersService: CareersService,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'MyCareersPage';
  }

  ngOnInit() {
    this.currentUser = new Model.User();
    this.title = 'Start Selecting Careers';
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.currentUser = res;
      if (!this.currentUser.careers) {
        this.currentUser.careers = [];
      }
      
      if (this.currentUser.careers.length > 0) {
        this.title = 'Edit My Careers';
      }
      this.careersService.setUserCareers(this.currentUser.careers);
    });
  }

  gotoCareesPage(type: string): void {
    if (type === 'internship') {
      this.navCtrl.push('CareersPage');
    } else {
      this.navCtrl.push('ScholarshipsPage');
    }
  }

  gotoSelectCareers(type: string): void {    
    this.navCtrl.push('CareersSelectPage', {type: type});    
  }
}
