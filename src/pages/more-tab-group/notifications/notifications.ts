import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, NotificationsService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications: Array<Model.Notifications>;
  limit: 20;
  offset: 0;

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
    this.notifications = new Array<Model.Notifications>();
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = res.map(notification => notification);
    }, (errors) => {
      alert('Server Error');
    });
  }

  goToPage(page, param, event) {
    this.navCtrl.push(page, param);
  }

}
