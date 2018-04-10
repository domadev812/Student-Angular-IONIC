import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, ScholarshipsService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { ImageUtil } from '../../../_utils/image.util';

@IonicPage({
  segment: 'scholarshipdetail/:resourceId'
})
@Component({
  selector: 'page-scholarshipdetail',
  templateUrl: 'scholarshipdetail.html',
})
export class ScholarshipDetailPage {
  @ViewChild(Content)
  content: Content;

  public scholarshipId: string;
  public scholarship: Model.Scholarship;
  public imageUrlCreate = ImageUtil.createImageUrl;
  public loading: boolean;
  isScrolled = false;
  title = 'Scholarhip';
  public url: string;


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
      this.url = this.scholarship.url;

    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  applyScholarship(): void {
    if (this.scholarship.in_app) {
      this.navCtrl.push('ScholarshipApplyPage', { scholarshipId: this.scholarshipId });
    } else {
      if (this.url.toLowerCase().lastIndexOf('http', 0) === 0) {
        window.open(this.url, '_blank');
      } else {
        window.open(`http://${this.url}`, '_blank');
      }
    }
  }
}


