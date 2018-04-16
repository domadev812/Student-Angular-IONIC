import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  isParent = false;

  constructor(
    public navService: NavigationService,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'NotificationsPage';
  }

}
