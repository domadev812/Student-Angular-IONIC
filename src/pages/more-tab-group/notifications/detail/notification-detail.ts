import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, Content } from 'ionic-angular';
import { NavigationService, NotificationsService } from '../../../../app/app.services.list';
import { Model } from '../../../../app/app.models';

@IonicPage({
  segment: 'notificationdetail/:resourceId'
})
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetailPage {
  @ViewChild(Content)
  content: Content;

  public notificationId: string;
  public notification: Model.Notification;
  isScrolled = false;
  title = 'Notification';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService,
    public viewCtrl: ViewController,
    private app: App,
    public zone: NgZone
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'NotificationDetailPage';
  }

  ngOnInit() {
    this.notification = new Model.Notification();
    this.notificationId = this.navParams.get('resourceId');
    this.notificationService.getNotification(this.notificationId).subscribe((res: Model.Notification) => {
      if (res) {
        this.notification = res;
      }
    }, err => console.log('There was an error', err));
  }

  goToPage(page: string, event: any): void {
    this.app.getActiveNavs()[0].setRoot(page);
    this.dismissIfPopover();
  }

  dismissIfPopover() {
    if (this.viewCtrl.isOverlay) {
      this.viewCtrl.dismiss();
    }
  }

  goBack() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.goToPage('MyKtsPage', null);
    }
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
}
