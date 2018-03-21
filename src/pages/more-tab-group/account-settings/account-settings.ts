import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, CurrentUserService, AuthService, AlertService } from '../../../app/app.services.list';
import { BaseUser } from '../../../_models/base-user.model';
import { Model } from '../../../app/app.models';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { User } from '../../../_models/user.model';


@IonicPage()
@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})
export class AccountSettingsPage {
  user: Model.User = new Model.User({});

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
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
