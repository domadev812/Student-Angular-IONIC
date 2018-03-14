import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, NotificationsService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications: Array<Model.Notification> = new Array<Model.Notification>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'NotificationsPage';
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res: Model.Notification[]) => {
      this.notifications = res;
    }, err => console.log('There was an error', err));
  }

  goToPage(page, param, event) {
    this.navCtrl.push(page, param);
  }

}
