import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NavigationService, FilterCareersService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-filter-career',
  templateUrl: 'filter-career.html',
})
export class FilterCareerPage {
  filter: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public filterCareersService: FilterCareersService,
    public viewCtrl: ViewController,
    private renderer: Renderer2
  ) {
  }

  ionViewCanEnter(): void {
    this.navService.currentPage = 'FilterCareerPage';
  }

  ionViewDidEnter(): void {
    let dismissWatch = this.renderer.listen('window', 'resize', (event) => {
      if (window.innerWidth >= 768) {
        this.done();
        dismissWatch();
      }
    });
  }

  goToPage(page: string, event: any): void {
    this.navCtrl.setRoot(page);
  }

  done(): void {
    this.viewCtrl.dismiss();
  }

  goBack(): void {
    this.filterCareersService.selectedCategory = null;
    this.navCtrl.push('MyCareersPage');
  }
}
