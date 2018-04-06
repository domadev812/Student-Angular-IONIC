import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, AuthService, CurrentUserService, CareersService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-my-careers',
  templateUrl: 'my-careers.html',
})
export class MyCareersPage {
  @ViewChild(Content)
  content: Content;

  currentUser: Model.User;
  sub_title: string;
  loading: boolean;

  isScrolled = false;
  title = 'My Careers';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public careersService: CareersService,
    public zone: NgZone
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'MyCareersPage';
  }

  ngOnInit() {
    this.loading = true;
    this.currentUser = new Model.User();
    this.sub_title = 'Start Selecting Careers';
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.currentUserService.getCurrentUser(this.authProvider, true).then((res: Model.User) => {
      this.currentUser = res;
      this.loading = false;
      if (!this.currentUser.careers) {
        this.currentUser.careers = [];
      }
      if (this.currentUser.careers.length > 0) {
        this.sub_title = 'Edit My Careers';
      }
      this.careersService.setUserCareers(this.currentUser.careers);
      this.careersService.careersChange();
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
    localStorage.setItem('searchBy', type);
    this.navCtrl.push('CareersSelectPage', { type: type });
  }

  onPageScroll(data) {
    this.zone.run(() => {
      if (data.scrollTop > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.content.ionScroll) {
      this.content.ionScroll.subscribe((data) => {
        this.onPageScroll(data);
      });
    }
  }
}
