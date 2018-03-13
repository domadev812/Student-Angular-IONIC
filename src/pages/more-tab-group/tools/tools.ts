import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App  } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {
  // TODO: Change url values once project is done.
  toolsList = [{name: 'Resumen Builder', url: 'https://www.google.com'},
           {name: 'ACT Prep', url: 'https://www.google.com'},
           {name: 'Career Cluster Test', url: 'https://www.google.com'},
           {name: 'Personality Index Test', url: 'https://www.google.com'},
           {name: 'FAFSA', url: 'https://www.google.com'},
           {name: 'Article/Link of the Month', url: 'https://www.google.com'}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public viewCtrl: ViewController,
    private app: App
  ) {
  }
  
  ionViewCanEnter() {
    this.navService.currentPage = 'ToolsPage';
  }

  openURL(url: string): void {
    window.open(url, '_blank');
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
