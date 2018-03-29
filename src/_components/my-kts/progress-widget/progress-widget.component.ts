import { Component, OnInit } from '@angular/core';
import * as Service from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { NavController } from 'ionic-angular';
import { AlertService, AuthService } from '../../../app/app.services.list';

@Component({
  selector: 'progress-widget',
  templateUrl: 'progress-widget.component.html'
})
export class ProgressWidgetComponent implements OnInit {
  text: string;
  userProgress: Model.UserProgress;
  prizesAmount = 0;
  opportunitiesAmount = 0;
  scholarshipsAmount = 0;

  constructor(
    private currentUserService: Service.CurrentUserService,
    public navCtrl: NavController,
    public alert: AlertService,
    public authService: AuthService
  ) { }

  async ngOnInit() {
    try {
      let user: Model.User = await this.currentUserService.getCurrentUser(this.authService);
      this.prizesAmount = user.prize_count || 0;
      this.opportunitiesAmount = user.opportunity_count || 0;
      this.scholarshipsAmount = user.scholarship_count || 0;
    } catch (err) {
      this.alert.handleError(err);
    }
  }

  goToProgress() {
    this.navCtrl.push('ProgressTrackerPage');
  }
}


