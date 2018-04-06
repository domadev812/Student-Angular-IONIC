import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { NavigationService, FilterService, OpportunitiesService, AlertService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';
import { Subscription } from 'rxjs/Subscription';
import { ImageUtil } from '../../_utils/image.util';

@IonicPage()
@Component({
  selector: 'page-careers',
  templateUrl: 'careers.html',
})

export class CareersPage {
  @ViewChild(Content)
  content: Content;

  limit = 20;
  offset = 0;
  pageToggle = true;
  opportunitiesList: Model.Opportunity[];
  currentType = 'Internship'; //other option is 'Other'
  input = '';
  infinite: any;
  my_internship: boolean;
  my_opportunity: boolean;
  my_filter: boolean;
  internshipSubscription: Subscription;
  opportunitySubscription: Subscription;
  scrolledDown: boolean;
  isScrolled = false;
  title = 'Careers';
  public imageUrlCreate = ImageUtil.createImageUrl;
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public modalCtrl: ModalController,
    public filterService: FilterService,
    public opportunitiesService: OpportunitiesService,
    public alert: AlertService,
    public zone: NgZone,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'CareersPage';
  }

  ngOnInit() {
    this.loading = true;
    this.internshipSubscription = this.filterService.newInternshipEvent.subscribe(event => this.onInternshipFilterChange(event));
    this.opportunitySubscription = this.filterService.newOpportunityEvent.subscribe(event => this.onOpportunityFilterChange(event));
    this.filterService.internshipFilterChange();
    this.filterService.opportunityFilterChange();
  }

  ngOnDestroy() {
    this.internshipSubscription.unsubscribe();
    this.opportunitySubscription.unsubscribe();
    this.scrolledDown = true;
    this.getOpportunities();
    this.filterService.newInternshipEvent.subscribe(event => this.onInternshipFilterChange(event));
    this.filterService.newOpportunityEvent.subscribe(event => this.onOpportunityFilterChange(event));
  }

  onPageScroll(data) {
    this.zone.run(() => {
      if (data.scrollTop > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.content.ionScroll) {
      this.content.ionScroll.subscribe((data) => {
        this.onPageScroll(data);
      });
    }
  }

  onOpportunityFilterChange(event): void {
    //TODO: CALL API WITH FILTER WHEN BACKEND IS READY
    this.my_opportunity = event.myOpportunities;
    this.my_filter = this.my_opportunity;
    if (!this.pageToggle) {
      this.getOpportunities();
    }
  }

  onInternshipFilterChange(event): void {
    //TODO: CALL API WITH FILTER WHEN BACKEND IS READY
    this.my_internship = event.myInternships;
    this.my_filter = this.my_internship;
    if (this.pageToggle) {
      this.getOpportunities();
    }
  }

  reset(): void {
    this.limit = 20;
    this.offset = 0;
    this.input = '';
  }

  openFilterModal(): void {
    let filter = this.pageToggle ? 'internships' : 'opportunities';
    let modal = this.modalCtrl.create('FilterPage', { filter: filter });
    modal.present();
  }

  search(type, event): void {
    this.reset();
    this.input = event.target.value;
    this.opportunitiesService.getOpportunities(type, this.my_filter, this.input).subscribe((res: Model.Opportunity[]) => {
      this.opportunitiesList = res;
      this.offset = res.length;
    }, err => {
      this.alert.handleError(err);
    });
  }

  toggle(internship: boolean): void {
    if (internship) {
      this.pageToggle = true;
      this.currentType = 'Internship';
      this.my_filter = this.my_internship;
    } else {
      this.pageToggle = false;
      this.currentType = 'Other';
      this.my_filter = this.my_opportunity;
    }
    if (this.infinite) this.infinite.enable(true);
    this.getOpportunities();
  }

  getOpportunities(): void {
    this.reset();
    this.opportunitiesService.getOpportunities(this.currentType, this.my_filter).subscribe((res: Model.Opportunity[]) => {
      this.loading = false;
      this.opportunitiesList = res;
      this.offset = res.length;
    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  doInfinite(infiniteScroll: any): void {
    this.opportunitiesService.getOpportunities(this.currentType, this.my_filter, this.input, this.offset, this.limit)
      .subscribe((res: Model.Opportunity[]) => {
        this.opportunitiesList = this.opportunitiesList.concat(res);
        this.offset = this.offset + res.length;
        this.infinite = infiniteScroll;
        if (res.length < this.limit) infiniteScroll.enable(false);
        infiniteScroll.complete();
      }, err => {
        this.alert.handleError(err);
      });
  }

  goToDetailPage(opportunityId: string): void {
    this.navCtrl.push('OpportunityDetailPage', { resourceId: opportunityId });
  }
}
