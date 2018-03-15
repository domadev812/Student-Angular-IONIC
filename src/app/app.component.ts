import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavigationService } from './app.services.list';
import { NavUtil } from './app.utils.list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  showNav = false;
  isMobile: boolean;
  mobileNav: boolean;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public app: App,
    public navigationService: NavigationService
  ) {

  }

  ngOnInit() {
    //this is so we don't set root if there is already a page link -- will change to more complex with auth
    if (!window.location.hash) {
      this.app.getActiveNavs()[0].setRoot('LoginPage');
    }



    this.platform.ready().then(() => {
      this.setNav();
      this.isMobile = this.platform.is('mobile'); 
      window.onresize = () => {
        this.setNav();
      };

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
          // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();


      this.app.viewDidEnter.subscribe(event => {
        const isPage = !event.isOverlay;
        const currentPage = this.navigationService.currentPage;
        if (isPage) this.showNav = !NavUtil.NO_NAVBAR_PAGES[currentPage];
      });
    });

  }

  setNav(): void {
    if (window.innerWidth > 768) {
      this.mobileNav = false;
    } else {
      this.mobileNav = true;
    }
  }

}

