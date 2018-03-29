import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, ScholarshipsService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { ImageUtil } from '../../../_utils/image.util';

@IonicPage()
@Component({
  selector: 'page-scholarshipdetail',
  templateUrl: 'scholarshipdetail.html',
})
export class ScholarshipDetailPage {
  public scholarshipId: string;
  public scholarship: Model.Scholarship;
  public imageUrlCreate = ImageUtil.createImageUrl;
  public loading: boolean;

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
    this.scholarship = new Model.Scholarship({});
    this.loading = true;
    this.scholarshipId = this.navParams.get('resourceId');
    this.scholarshipsService.getScholarship(this.scholarshipId).subscribe((res: Model.Scholarship) => {
      this.loading = false;
      this.scholarship = res;
      console.log(this.scholarship);
    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  applyScholarship(): void {
    if (this.scholarship.in_app) {
      this.navCtrl.push('ScholarshipApplyPage', { scholarshipId: this.scholarshipId });
    } else {
      this.scholarshipsService.applyScholarship(this.scholarshipId, {}).subscribe((res: boolean) => {
        this.alert.toast('Scholarship is applied to successfully');
      }, err => {
        this.alert.handleError(err);
      });
    }
  }
}
