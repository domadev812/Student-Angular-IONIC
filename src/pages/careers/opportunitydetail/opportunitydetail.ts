import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationService, OpportunitiesService, AlertService } from '../../../app/app.services.list';
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
    public alert: AlertService
  ) {
  }

  ionViewCanEnter(): void {
    this.navService.currentPage = 'OpportunityDetailPage';
  }

  ngOnInit(): void {
    this.opportunity = new Model.Opportunity();
    this.opportunityId = this.navParams.get('resourceId');
    this.opportunitiesService.getOpportunity(this.opportunityId).subscribe((res: Model.Opportunity) => {
      this.opportunity = res;
    }, err => {
      this.alert.handleError(err);
    });
  }

  applyOpportunity(): void {
    this.opportunitiesService.applyOpportunity(this.opportunityId).subscribe((res: boolean) => {
      this.alert.toast(`We will let ${this.opportunity.organization.name} know you are interested.`);
    }, err => {
      this.alert.handleError(err);
    });
  }
}
