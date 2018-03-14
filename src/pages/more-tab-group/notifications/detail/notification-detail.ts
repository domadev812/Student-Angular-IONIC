import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { NavigationService, NotificationsService } from '../../../../app/app.services.list';
import { Model } from '../../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetailPage {
  public notificationId: string;
  public notification: Model.Notification;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public notificationService: NotificationsService,
    public viewCtrl: ViewController,
    private app: App
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'NotificationDetailPage';
  }

  ngOnInit() {
    this.notification = new Model.Notification();
    this.notificationId = this.navParams.get('notificationId');
    // TODO: Remove below line once project is done.
    this.notificationId = '58';
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
}
