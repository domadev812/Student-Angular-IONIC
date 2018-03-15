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
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filterCareersService: FilterCareersService,
    public alert: AlertService,
    public careerService: CareersService) {
  }

  ngOnInit() { 
    this.filterCareersList = new Array<Model.Career>();
       
    this.type = this.navParams.get('type');
    if (!this.type) {
      this.type = 'categories';
    }    
    this.filterCareersService.type = this.type;    
    this.subscription = this.filterCareersService.categoryEvent.subscribe(event => this.onCategoryChange(event));
    
    this.careerService.getCareers().subscribe((res: Model.Career[]) => {  
      this.careersList = res;       
    }, err => {
      this.alert.handleError(err);
    });
  }

  onCategoryChange(event): void {
    console.log(event);
  }
}
