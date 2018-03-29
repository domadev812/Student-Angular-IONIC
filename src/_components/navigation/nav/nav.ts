import { Component } from '@angular/core';
import { App, PopoverController } from 'ionic-angular';
import { AuthService, NavigationService, CurrentUserService } from '../../../app/app.services.list';
import { Subscription } from 'rxjs/Subscription';
import { NavUtil } from '../../../_utils/nav.util';
import { Model } from '../../../app/app.models';

@Component({
  selector: 'nav',
  templateUrl: 'nav.html'
})
export class NavigationComponent {
  points: number;
  pointsSubscription: Subscription;

  constructor(
    private app: App,
    private authService: AuthService,
    public navService: NavigationService,
    public popoverCtrl: PopoverController,
    public currentUserService: CurrentUserService,
  ) {}

  ngOnInit() {
    this.points = 0;
    this.pointsSubscription = this.currentUserService.pointsEvent.subscribe(event => this.pointsChanged(event));
    this.getCurrentUser();
  }

  ngOnDestroy() { 
    this.pointsSubscription.unsubscribe();
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

  getCurrentUser(): void {
    this.currentUserService.getCurrentUser(this.authService, true).then((res: Model.User) => {
      this.points = res.points ? res.points : 0;
    }, err => {});
  }

  pointsChanged(points: number): void {    
    if (points) {
      this.points = points;
    }
  }
}
