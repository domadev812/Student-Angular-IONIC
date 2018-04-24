import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;
  sliderOptions = {
    paginationType: 'bullets',
    pager: true
  };

  slideNext() {}
  onSlideTapped() {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public navService: NavigationService) {}

  ionViewCanEnter() {
    this.navService.currentPage = 'TutorialPage';
  }

  goToMyKts() {
    this.navCtrl.push('MyKtsPage');
  }
}
