import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigationService, NotificationsService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@Component({
  selector: 'notifications-widget',
  templateUrl: 'notifications-widget.component.html'
})
export class NotificationsWidgetComponent implements OnInit {

  notifications: Array<Model.Notification> = new Array<Model.Notification>();
  limit = '5';
  offset = '0';
  resourceId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService,
    public alert: AlertService,
  ) {
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {

    this.notificationService.getNotifications(this.limit, this.offset).subscribe((res: Model.Notification[]) => {
      this.notifications = res;
      this.offset += res.length;
    }, err => {
      this.alert.handleError(err);
    });
  }
  goToNotifications(): void {
    this.navCtrl.push('NotificationsPage');
  }


  goToNotificationDetail(id: string): void {
    let selectedNot = this.notifications.find(x => x.id === id);
    let route = selectedNot.getRoute();
    let resourceId = selectedNot.resource_id;
    this.navCtrl.push(route, { resourceId: resourceId });
  }
}
