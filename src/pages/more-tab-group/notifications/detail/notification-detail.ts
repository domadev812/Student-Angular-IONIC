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
  public notification: Model.Notifications;

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
    this.notification = new Model.Notifications();
    this.notificationId = this.navParams.get('notificationId');
    // TODO: Remove below line once project is done.
    this.notificationId = '58';
    this.notificationService.getNotification(this.notificationId).subscribe((res: Model.Notifications) => {
      console.log(res);
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
    console.log('this is previous', this.navCtrl.getPrevious());
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.goToPage('MyKtsPage', null);
    }
  }
}
