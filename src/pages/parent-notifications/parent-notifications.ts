import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';

@IonicPage({
  segment: 'parent-notifications/:token'
})
@Component({
  selector: 'parent-notifications',
  templateUrl: 'parent-notifications.html',
})
export class ParentNotificationsPage {

  token = '';
  isParent = true;

  constructor(
    public navParams: NavParams,
    public navService: NavigationService,
  ) {
  }

  ngOnInit() {
    this.token = this.navParams.data.token === ':token' ? '' : this.navParams.data.token;
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ParentNotificationsPage';
  }

}

