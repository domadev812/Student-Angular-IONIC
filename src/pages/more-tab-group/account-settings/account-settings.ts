import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, CurrentUserService, AuthService, AlertService, OrganizationService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';


@IonicPage()
@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})
export class AccountSettingsPage {
  user: Model.User = new Model.User({});
  organization_name: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public organizationService: OrganizationService,
    public alert: AlertService

  ) {
  }


  ionViewCanEnter() {
    this.navService.currentPage = 'AccountSettingsPage';
  }

  ngOnInit() {
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.user = res;   
      if (this.user.gender === 'M') {
        this.user.gender = 'Male';
      } else if (this.user.gender === 'F') {
        this.user.gender = 'Female';
      } else (this.user.gender = 'Perfer Not To Say');

      if (this.user.organization && this.user.organization.name) {
        this.organization_name = this.user.organization.name;
      }
    });
  }

  saveUser(userSettings: boolean): void {
    if (!userSettings) {
      return;
    }
    this.userSettings();
  }

  userSettings() {
    this.currentUserService.updateUser(this.user, this.user.id).subscribe((res) => {
      this.alert.toast('Information updated.');
    }, err => {
      this.alert.handleError(err);
    });
  }
}
