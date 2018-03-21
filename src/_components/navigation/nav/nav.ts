import { Component } from '@angular/core';
import { App, PopoverController } from 'ionic-angular';
import { AuthService, NavigationService } from '../../../app/app.services.list';
import { NavUtil } from '../../../_utils/nav.util';


@Component({
  selector: 'nav',
  templateUrl: 'nav.html'
})
export class NavigationComponent {
  constructor(
    private app: App,
    private authService: AuthService,
    public navService: NavigationService,
    public popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    console.log('Nav Init');
  }

  presentPopover(myEvent): void {
    let popover = this.popoverCtrl.create('MorePage', {}, {cssClass: 'more-web-nav-popover'});
    popover.present({
      ev: myEvent,
    });
  }

  goToPage(page: string, event: any): void {
    this.app.getActiveNavs()[0].setRoot(page);
  }

  activeLink(page: string): string {
   return NavUtil.getActiveLink(page);
  }

  navIcon(page: string, iconBaseName: string): string {
    return NavUtil.getNavIcon(page, iconBaseName);
  }

  moreIcon(): string {
    return NavUtil.getMoreIcon();
  }
}
