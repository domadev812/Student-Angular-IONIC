import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, CurrentUserService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { Scholarship } from '../../../_models/scholarship.model';

@IonicPage()
@Component({
  selector: 'page-progress-tracker',
  templateUrl: 'progress-tracker.html',
})
export class ProgressTrackerPage {
  @ViewChild(Content)
  content: Content;

  userProgress: Model.UserProgress;
  scholarships: Array<Model.Scholarship>;
  prizes: Array<Model.Prize>;
  internships: Array<Model.Opportunity>;
  opportunities: Array<Model.Opportunity>;

  isScrolled = false;
  title = 'Progress';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public currentUserService: CurrentUserService,
    public alert: AlertService,
    public zone: NgZone
  ) {
  }

  ngOnInit() {
    this.getUserProgress();
    this.prizes = new Array<Model.Prize>();
    this.scholarships = new Array<Model.Scholarship>();
    this.internships = new Array<Model.Opportunity>();
    this.opportunities = new Array<Model.Opportunity>();

  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ProgressTrackerPage';
  }

  getUserProgress() {
    this.currentUserService.getUserProgress().subscribe((res: Model.UserProgress) => {
      if (res) {
        if (res.prizes) this.prizes = res.prizes;
        if (res.other_opportunities) this.opportunities = res.other_opportunities;
        if (res.internships) this.internships = res.internships;
        if (res.scholarships) this.scholarships = res.scholarships;
      }
    }, err => {
      this.alert.handleError(err);
    });
  }

  goToPage(page, param, event) {
    this.navCtrl.push(page, param);
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
