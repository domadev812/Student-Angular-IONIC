import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public navService: NavigationService
  ) {
  }
  
  ionViewCanEnter() {
    this.navService.currentPage = 'ToolsPage';
  }

  gotoPage(url: string): void {
    window.open(url, '_blank');
  }
}
