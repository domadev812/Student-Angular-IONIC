import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, OpportunitiesService} from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-opportunitydetail',
  templateUrl: 'opportunitydetail.html',
})
export class OpportunityDetailPage {  
  public opportunityId: string;
  public opportunity: Model.Opportunity;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,     
    public opportunitiesService: OpportunitiesService,    
  ) {
  }

  ionViewCanEnter(): void {
    this.navService.currentPage = 'OpportunityDetailPage';
  }

  ngOnInit(): void { 
    this.opportunity = new Model.Opportunity();           
    this.opportunityId = this.navParams.get('opportunityId');  
    this.opportunitiesService.getOpportunity(this.opportunityId).subscribe((res: Model.Opportunity) => {
      this.opportunity = res;        
    }, err => console.log('There was an error', err));
  }

  applyOpportunity(): void {
    this.opportunitiesService.applyOpportunity(this.opportunityId).subscribe((res: boolean) => {
      alert('Opportunity was applied successfully');     
    }, err => console.log('There was an error', err));
  }
}
