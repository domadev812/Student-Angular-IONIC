import { Component } from '@angular/core';
import { App, PopoverController } from 'ionic-angular';
import { NavUtil } from '../../../_utils/nav.util';

@Component({
  selector: 'tabs-nav',
  templateUrl: 'tabs-nav.html'
})
export class TabsNavComponent {

  constructor(
    private app: App,
    public popoverCtrl: PopoverController) {
  }


  presentPopover(myEvent): void {
    let popover = this.popoverCtrl.create('MorePage', {}, { cssClass: 'more-web-nav-popover' });
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
    return NavUtil.getMoreIcon('-mobile');
  }

  navPush(page: string) {
    this.app.getActiveNavs()[0].push(page, {}, { duration: 1 });
  }

}
