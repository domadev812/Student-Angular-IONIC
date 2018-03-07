import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, ScholarshipsService, MultiselectService } from '../../../app/app.services.list';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';
@IonicPage()
@Component({
  selector: 'page-scholarshipapply',
  templateUrl: 'scholarshipapply.html',
})
export class ScholarshipApplyPage {
  scholarshipId: string;
  fullName: string;
  phoneNumber: string;
  comment: string;
  gradeList: Object[] = [{ itemName: 'Senior', id: 1 }, 
                            { itemName: 'Junior', id: 2 },
                            { itemName: 'Expert', id: 3 },
                            { itemName: 'Beginner', id: 4 }];
  selectedGrade: Object[] = [];
  ktsSelectSettings: Object = {};
  universityList: Object[] = [];
  selectedUniversity: Object[] = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public navService: NavigationService,
    public scholarshipsService: ScholarshipsService,
    private multiselectService: MultiselectService
  ) {
  }

  ngOnInit() {
    this.scholarshipId = this.navParams.get('scholarshipId');        
    this.scholarshipId = '8';   
    this.ktsSelectSettings = MultiSelectUtil.selectOptions({text: ' '});
    this.multiselectService.getDropdownSchools().subscribe((res) => {
      this.universityList = res;
    }, err => {
      console.log('err', err);
    });     
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipApplyPage';
  }

  applyScholarship(valid: boolean): void {
    if (!valid || this.selectedGrade.length === 0 || this.selectedUniversity.length === 0) {
      return;
    }
    // let data = {
    //   name : this.fullName,
    //   phone_number: this.phoneNumber,
    //   category: this.selectedCategory[0]['itemName'],
    //   message: this.message
    // };
    // this.contactUsService.sendData(data).subscribe((res: boolean) => {
    //   alert('Send message successfully.');      
    // }, err => console.log('There was an error', err));    
  }

  onGradeSelect(item): void {    
  }
  
  onUniversitySelect(item): void {    
  }
}
