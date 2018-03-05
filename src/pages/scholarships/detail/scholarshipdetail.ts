import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, ScholarshipsService} from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-scholarshipdetail',
  templateUrl: 'scholarshipdetail.html',
})
export class ScholarshipDetailPage {  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,     
    public scholarshipsService: ScholarshipsService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipDetailPage';
  }

  ngOnInit() {    
    const scholarshipId = this.navParams.get('scholarshipId');
    console.log(scholarshipId);
    // this.scholarshipsService.getScholarships().subscribe((res: Model.Scholarship[]) => {
    //   this.scholarshipsList = res;
    // }, err => console.log('There was an error', err));
  }
}
