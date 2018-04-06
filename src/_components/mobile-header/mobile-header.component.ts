import { Component, Input } from '@angular/core';
import { NavController, ViewController, App } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { CurrentUserService, AuthService, AlertService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';

@Component({
  selector: 'mobile-header',
  templateUrl: 'mobile-header.component.html'
})

export class MobileHeaderComponent {

  @Input() isScrolled = true;
  @Input() title;
  @Input() isArrowBack = false;

  pointsSubscription: Subscription;
  points: number;
  constructor(public navCtrl: NavController,
              public currentUserService: CurrentUserService,
              public authProvider: AuthService,
              public alert: AlertService,
              public viewCtrl: ViewController,
              public app: App) {
  }

  ngOnInit() {
    this.pointsSubscription = this.currentUserService.pointsEvent.subscribe(event => this.pointsChanged(event));  
    this.points = 0;   
    this.getCurrentUser();   
  }

  ngOnDestroy() { 
    this.pointsSubscription.unsubscribe();    
  }
  
  getCurrentUser(): void {
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {      
      this.points = res.points ? res.points : 0;            
    }, err => {
      this.alert.handleError(err);
    });
  }

  gotoEarnPage(): void {
    this.navCtrl.push('KeyRedemptionPage');
  }

  pointsChanged(points: number): void {    
    if (points) {
      this.points = points;
    }
  }

  goBack(): void {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.goToPage('MyKtsPage', null);
    }
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
}
