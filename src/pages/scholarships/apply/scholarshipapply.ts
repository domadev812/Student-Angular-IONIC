import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import {
  NavigationService,
  ScholarshipsService,
  AuthService,
  CurrentUserService,
  OrganizationService,
  AlertService
} from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-scholarshipapply',
  templateUrl: 'scholarshipapply.html',
})
export class ScholarshipApplyPage {
  scholarshipId: string;
  fullName: string;
  gradeYear: number;
  organizationName: string;
  essay: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public scholarshipsService: ScholarshipsService,
    public organizationService: OrganizationService,
    public alert: AlertService,
    public viewCtrl: ViewController,
    public app: App
  ) {
  }

  ngOnInit() {
    this.scholarshipId = this.navParams.get('scholarshipId');

    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.fullName = res.getName();
      this.gradeYear = res.graduation_year;
      this.organizationName = res.organization.name;
    });
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipApplyPage';
  }

  applyScholarship(valid: boolean): void {
    if (!valid) {
      return;
    }
    let data = {
      application: {
        essay: this.essay
      }
    };
    this.scholarshipsService.applyScholarship(this.scholarshipId, data).subscribe((res: boolean) => {
      this.alert.toast('You have applied to this scholarship.');
      this.navCtrl.push('ScholarshipsPage');
    }, err => {
      this.alert.handleError(err);
    });
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
