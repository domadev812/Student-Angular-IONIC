import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, CurrentUserService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { Scholarship } from '../../../_models/scholarship.model';

@IonicPage()
@Component({
  selector: 'page-progress-tracker',
  templateUrl: 'progress-tracker.html',
})
export class ProgressTrackerPage {
  userProgress: Model.UserProgress;
  scholarships: Array<Model.Scholarship>;
  prizes: Array<Model.Prize>;
  internships: Array<Model.Opportunity>;
  opportunities: Array<Model.Opportunity>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public currentUserService: CurrentUserService
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
      console.log('There was an error', err);
    });
  }

  goToPage(page, param, event) {
    this.navCtrl.push(page, param);
  }

}
