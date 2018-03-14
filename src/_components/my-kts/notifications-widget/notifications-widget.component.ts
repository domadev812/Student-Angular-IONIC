import { Component, OnInit } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, NotificationsService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@Component({
  selector: 'notifications-widget',
  templateUrl: 'notifications-widget.component.html'
})
export class NotificationsWidgetComponent implements OnInit {

  notifications: Array<Model.Notifications> = new Array<Model.Notifications>();

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
    this.notificationService.getNotifications().subscribe((res: Model.Notifications[]) => {
      this.notifications = res;
      console.log(this.notifications);
    }, err => console.log('There was an error', err));
  }
  goToNotifications(): void {
    this.navCtrl.push('NotificationsPage');
  }
}
