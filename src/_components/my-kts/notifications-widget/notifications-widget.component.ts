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
  limit = '5';
  offset = '0';
  type: string;
  resourceId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService,

  ) {
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications(this.limit, this.offset).subscribe((res: Model.Notification[]) => {
      this.notifications = res;
    }, err => console.log('There was an error', err));
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
