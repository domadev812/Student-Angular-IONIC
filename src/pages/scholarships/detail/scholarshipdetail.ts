import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, ScholarshipsService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-scholarshipdetail',
  templateUrl: 'scholarshipdetail.html',
})
export class ScholarshipDetailPage {
  public scholarshipId: string;
  public scholarship: Model.Scholarship;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public scholarshipsService: ScholarshipsService,
    public alert: AlertService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipDetailPage';
  }

  ngOnInit() {
    this.scholarship = new Model.Scholarship(null);
    this.scholarshipId = this.navParams.get('scholarshipId');
    this.scholarshipsService.getScholarship(this.scholarshipId).subscribe((res: Model.Scholarship) => {
      this.scholarship = res;
      console.log(this.scholarship);
    }, err => {
      this.alert.handleError(err);
    });
  }

  applyScholarship(): void {
    if (this.scholarship.in_app) {
      this.navCtrl.push('ScholarshipApplyPage', { scholarshipId: this.scholarshipId });
    } else {
      this.scholarshipsService.applyScholarship(this.scholarshipId, {}).subscribe((res: boolean) => {
        this.alert.toast('Opportunity is applied to successfully');
      }, err => {
        this.alert.handleError(err);
      });
    }
  }
}
