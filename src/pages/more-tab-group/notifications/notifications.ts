import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, NotificationsService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  @ViewChild(Content)
  content: Content;

  notifications: Array<Model.Notification> = new Array<Model.Notification>();
  isScrolled = false;
  title = 'Notifications';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService,
    public alert: AlertService,
    public zone: NgZone
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
    }, err => {
      this.alert.handleError(err);
    });
  }

  goToPage(page, param, event) {
    this.navCtrl.push(page, param);
  }

  onPageScroll(data) {
    this.zone.run(() => {
      if (data.scrollTop > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.content.ionScroll) {
      this.content.ionScroll.subscribe((data) => {
        this.onPageScroll(data);
      });
    }
  }
  goToNotificationDetail(id: string): void {
    let selectedNot = this.notifications.find(x => x.id === id);
    let route = selectedNot.getRoute();
    let resourceId = selectedNot.resource_id;
    this.navCtrl.push(route, { resourceId: resourceId });
  }

}
