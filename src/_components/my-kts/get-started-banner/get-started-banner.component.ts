import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'get-started-banner',
  templateUrl: 'get-started-banner.component.html'
})
export class GetStartedBannerComponent {
  constructor(
    public navCtrl: NavController
  ) { }

  goToPage(page: string): void {
    this.navCtrl.push(page);
  }

}