import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { AuthService, NavigationService } from '../../../app/app.services.list';


@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})

export class MorePage {
  isPopover: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public viewCtrl: ViewController,
    private app: App,
    public navService: NavigationService ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'MorePage';
  }

  ionViewDidLoad() {
    this.isPopover = this.viewCtrl.isOverlay;
  }


  logout(): void {
    this.authService.logout();
    this.dismissIfPopover();
  }

  goToPage(page: string, event: any): void {
    this.app.getActiveNavs()[0].push(page, {}, {duration: 1});
    this.dismissIfPopover();
  }

  dismissIfPopover() {
    if (this.viewCtrl.isOverlay) {
      this.viewCtrl.dismiss();
    }
  }

  close() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop({duration: 1});
    } else {
      this.goToPage('MyKtsPage', null);
    }
  }

}
