import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigationService, NotificationsService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@Component({
  selector: 'notifications-widget',
  templateUrl: 'notifications-widget.component.html'
})
export class NotificationsWidgetComponent implements OnInit {

  notifications: Array<Model.Notification> = new Array<Model.Notification>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService
  ) {
  }

  ngOnInit() {
    this.getNotifications();
  }


  getNotifications() {
    this.notificationService.getNotifications().subscribe((res: Model.Notification[]) => {
      this.notifications = res;
    }, err => console.log('There was an error', err));
  }
  goToNotifications(): void {
    this.navCtrl.push('NotificationsPage');
  }
}
