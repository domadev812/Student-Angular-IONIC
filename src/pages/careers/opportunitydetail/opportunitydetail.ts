import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NavigationService, OpportunitiesService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { ImageUtil } from '../../../_utils/image.util';

@IonicPage({
  segment: 'opportunitydetail/:resourceId'
})
@Component({
  selector: 'page-opportunitydetail',
  templateUrl: 'opportunitydetail.html',
})
export class OpportunityDetailPage {
  @ViewChild(Content)
  content: Content;

  public opportunityId: string;
  public opportunity: Model.Opportunity;
  public organization: Model.Organization;
  public imageUrlCreate = ImageUtil.createImageUrl;
  loading: boolean;

  isScrolled = false;
  title = 'Opportunity';
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
    this.opportunity = new Model.Opportunity({});
    this.loading = true;
    this.opportunityId = this.navParams.get('resourceId');
    this.opportunitiesService.getOpportunity(this.opportunityId).subscribe((res: Model.Opportunity) => {
      this.loading = false;
      this.opportunity = res;
    }, err => {
      this.loading = false;
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
