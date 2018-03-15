import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilterCareersService, AlertService, CareersService } from '../../app/app.services.list';
import { Subscription } from 'rxjs/Subscription';
import { Model } from '../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-careers-select',
  templateUrl: 'careers-select.html',
})
export class CareersSelectPage {
  public type: string;
  public careersList: Array<Model.Career>;
  public filterCareersList: Array<Model.Career>;
  public selectedCareers: Array<Model.Career>;
  public subscription: Subscription;
  public disableFlag: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterCareersService: FilterCareersService,
    public alert: AlertService,
    public careerService: CareersService) {
  }

  ngOnInit() { 
    this.filterCareersList = new Array<Model.Career>();
    this.selectedCareers = new Array<Model.Career>();
    this.disableFlag = true;

    this.type = this.navParams.get('type');
    if (!this.type) {
      this.type = 'categories';
    }    
    this.filterCareersService.type = this.type;    
    this.subscription = this.filterCareersService.categoryEvent.subscribe(event => this.onCategoryChange(event));
    
    this.careerService.getCareers().subscribe((res: Model.Career[]) => {  
      this.careersList = res.filter(career => career.careerGroup.length > 0);                   
    }, err => {
      this.alert.handleError(err);
    });
  }

  onCategoryChange(event): void {
    this.filterCareersList = this.careersList.filter(career => {
      let careerGroup = career.careerGroup.find(career_group => career_group.id === event.id);
      return careerGroup ? true : false;
    });    
  }

  removeSelectedCareer(index: number): void {
    this.selectedCareers.splice(index, 1);
  }

  selectCareer(selectedCareer: Model.Career): void {
    if (this.selectedCareers.length === 5) {
      return;
    }
    let duplicate = this.selectedCareers.find(career => career.id === selectedCareer.id);
    if (duplicate) {
      return;
    }
    this.selectedCareers.push(selectedCareer);
  }

  saveCareers() {
    let career_ids = this.selectedCareers.map(career => career.id);
    this.careerService.addUserCareers(career_ids).subscribe((res: boolean) => {  
      alert('Add user careers successfully');
    }, err => {
      this.alert.handleError(err);
    });
  }
}
