import { Component, OnInit } from '@angular/core';
import * as Service from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { NavController } from 'ionic-angular';

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
    private authService: Service.AuthService,
    public navCtrl: NavController,
  ) {}

   ngOnInit() {
     this.currentUserService.getUserProgress().subscribe((res) => {
        this.userProgress = res;
        this.prizesAmount = this.userProgress.prizes.length;
        this.opportunitiesAmount = this.userProgress.other_opportunities.length + this.userProgress.internships.length;
        this.scholarshipsAmount = this.userProgress.scholarships.length;
      }, (erros) => {
        alert('Server error');
      });
    }
    
    goToProgress() {
      this.navCtrl.push('ProgressTrackerPage');
    }
  }


