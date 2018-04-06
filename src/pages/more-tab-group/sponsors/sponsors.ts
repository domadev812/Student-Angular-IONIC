import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, AlertService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {
  @ViewChild(Content)
  content: Content;

  isScrolled = false;
  title = 'Sponsors';
  sponsorsLogoList = [{ img_name: 'academy-logo.svg' },
  { img_name: 'alpine-logo.svg' },
  { img_name: 'bear-river-logo.svg' },
  { img_name: 'bridgerland-logo.svg' },
  { img_name: 'davistech-logo.svg' },
  { img_name: 'diversified-logo.svg' },
  { img_name: 'ivory-homes-logo.svg' },
  { img_name: 'ken-garff-logo.svg' },
  { img_name: 'mountain-america-logo.svg' },
  { img_name: 'news-expect-more-logo.svg' },
  { img_name: 'octanner-logo.svg' },
  { img_name: 'odgen-weber-logo.svg' },
  { img_name: 'permaplate-logo.svg' },
  { img_name: 'synthetic-logo.svg' },
  { img_name: 'tooele-technical-logo.svg' },
  { img_name: 'utah-educational-logo.svg' },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public alert: AlertService,
    public zone: NgZone
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'SponsorsPage';
  }

  ngOnInit() {

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
}
