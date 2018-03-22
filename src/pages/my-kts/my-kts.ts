import { Component, ViewChild, NgZone, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, CurrentUserService, AuthService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';

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
  windowWidth: number = window.innerWidth;
  userHasNoCareer: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public zone: NgZone,
    public currentUserService: CurrentUserService,
    public authProvider: AuthService
  ) {}

  ionViewCanEnter(): void {
    this.navService.currentPage = 'MyKtsPage';
  }

  ionViewDidEnter(): void {
    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      if ((res.careers && res.careers.length > 0) || res.career_count !== undefined) {
        this.userHasNoCareer = false;
      } else {
        this.userHasNoCareer = true;
      }
    });
  }

  onPageScroll(data): void {
    this.zone.run(() => {
      if (data.scrollTop > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    if (this.content.ionScroll) {
      this.content.ionScroll.subscribe((data) => {
        this.onPageScroll(data);
      });
    }
  }

  goToPage(page: string): void {
    this.navCtrl.push(page);
  }

  @HostListener('window:resize', ['$event'])
  resize(event): void {
    this.windowWidth = window.innerWidth;
  }

  showBanner(): string {
    if (this.windowWidth >= 768) {
      return 'desktop';
    } else if (this.windowWidth < 768) {
      return 'mobile';
    }
  }

}
