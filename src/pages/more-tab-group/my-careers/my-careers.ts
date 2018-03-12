import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, AuthService, CurrentUserService } from '../../../app/app.services.list';
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
      // TODO: Remove once careers part is completed
      if (!this.currentUser.careers) {
        this.currentUser.careers = [];
      }
      if (this.currentUser.careers.length === 0) {
        this.currentUser.careers = [
          {id: 1, name: 'Career1'},
          {id: 2, name: 'Career2'},
          {id: 3, name: 'Career3'},
          {id: 4, name: 'Career4'},
          {id: 5, name: 'Career5'},
        ];
      }
      
      if (this.currentUser.careers.length > 0) {
        this.title = 'Edit My Careers';
      }
    });
  }

  gotoCareesPage(type: string): void {
    if (type === 'internship') {
      this.navCtrl.push('CareersPage');
    } else {
      this.navCtrl.push('ScholarshipsPage');
    }
  }
}
