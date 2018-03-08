import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, ScholarshipsService, MultiselectService, 
         AuthService, CurrentUserService, OrganizationService } from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-scholarshipapply',
  templateUrl: 'scholarshipapply.html',
})
export class ScholarshipApplyPage {
  scholarshipId: string;
  fullName: string;
  gradeYear: number;
  organizationName: string;
  essay: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService,
    public authProvider: AuthService,
    public currentUserService: CurrentUserService,
    public scholarshipsService: ScholarshipsService,
    public organizationService: OrganizationService,
    private multiselectService: MultiselectService
  ) {
  }

  ngOnInit() {
    this.scholarshipId = this.navParams.get('scholarshipId');        
    this.scholarshipId = '8';   

    this.currentUserService.getCurrentUser(this.authProvider).then((res: Model.User) => {
      this.fullName = res.getName();
      this.gradeYear = res.graduation_year;      
      this.organizationName = res.organization_name;      
    });
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipApplyPage';
  }

  applyScholarship(valid: boolean): void {
    if (!valid) {
      return;
    }
    let data = {
      application: {
        essay: this.essay
      }
    };       
    this.scholarshipsService.applyScholarship(this.scholarshipId, data).subscribe((res: boolean) => {
      alert('Scholarship is applied successfully');     
    }, err => console.log('There was an error', err));
  }
}
