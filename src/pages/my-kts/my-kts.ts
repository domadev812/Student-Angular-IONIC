import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService } from '../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-my-kts',
  templateUrl: 'my-kts.html',
})

export class MyKtsPage {
  @ViewChild(Content)
  content: Content;

  isScrolled = false;
  title = 'My KTS';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public zone: NgZone,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'MyKtsPage';
  }
  
  onPageScroll(data) {
    this.zone.run(() => {
      if (data.scrollTop > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }
  
  ngAfterViewInit() {
    if (this.content.ionScroll) {
      this.content.ionScroll.subscribe((data) => {
        this.onPageScroll(data);
      });
    }
  } 

  goToPage(page: string): void {
    this.navCtrl.push(page);
  }

}
