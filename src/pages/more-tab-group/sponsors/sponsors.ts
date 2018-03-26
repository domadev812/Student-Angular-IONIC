import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

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
  sponsorsLogoList = [{img_name: 'academy_logo.svg'},
                  {img_name: 'alpine_logo.svg'},
                  {img_name: 'bear_river_logo.svg'},
                  {img_name: 'bridgerland_logo.svg'},
                  {img_name: 'davistech_logo.svg'},
                  {img_name: 'diversified_logo.svg'},
                  {img_name: 'ivory_homes_logo.svg'},
                  {img_name: 'ken_graff_logo.svg'},
                  {img_name: 'mountain_america_logo.svg'},
                  {img_name: 'news_expect_more_logo.svg'},
                  {img_name: 'octanner_logo.svg'},
                  {img_name: 'odgen_weber_logo.svg'},
                  {img_name: 'permaplate_logo.svg'},
                  {img_name: 'synthetic_logo.svg'},
                  {img_name: 'tooele_technical_logo.svg'},
                  {img_name: 'utah_educational_logo.svg'},
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
