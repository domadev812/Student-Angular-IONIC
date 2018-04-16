import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { NotificationsService, AlertService } from '../../app/app.services.list';
import { NgZone } from '@angular/core';
import { Model } from '../../app/app.models';


@Component({
  selector: 'notifications-component',
  templateUrl: 'notifications.component.html'
 })

export class NotificationsComponent {
  @Input() isParent;
  @Input() token = '';
  @ViewChild(Content)
  content: Content;

  notifications: Array<Model.Notification> = new Array<Model.Notification>();
  title = 'Notifications';
  limit = '50';
  offset = '0';
  isScrolled = false;
  loading: boolean;
  
  constructor(
    public navCtrl: NavController,
    public notificationService: NotificationsService,
    public alert: AlertService,
    public navParams: NavParams,
    public zone: NgZone
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getNotifications(this.isParent);
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

  getNotifications(isParent) {
    if (isParent) {
      this.notificationService.getParentNotifications(this.token, this.limit, this.offset)
      .subscribe(this.onDataSuccess.bind(this), this.onDataFailure.bind(this));
    } else {
      this.notificationService.getNotifications(this.limit, this.offset)
      .subscribe(this.onDataSuccess.bind(this), this.onDataFailure.bind(this));
    }
  }

  onDataSuccess(res: Model.Notification[]): void {
    this.loading = false;
    this.notifications = res;
  }

  onDataFailure(err): void {
    this.loading = false;
    this.alert.handleError(err);
  }
}