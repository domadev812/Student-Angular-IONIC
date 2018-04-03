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
  limit = '50';
  offset = '0';

  loading: boolean;

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
    this.loading = true;
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications(this.limit, this.offset).subscribe((res: Model.Notification[]) => {
      this.loading = false;
      this.notifications = res;
    }, err => {
      this.loading = false;
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
    let resourceId = selectedNot.getResourceId();
    this.navCtrl.push(route, { resourceId: resourceId });
  }

}
