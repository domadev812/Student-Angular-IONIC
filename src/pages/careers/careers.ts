import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NavigationService, FilterService, OpportunitiesService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-careers',
  templateUrl: 'careers.html',
})

export class CareersPage {
  limit = 20;
  offset = 0;
  pageToggle = true;
  opportunitiesList: Model.Opportunity[];
  currentType = 'Internship'; //other option is 'Other'
  input = '';
  infinite: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public modalCtrl: ModalController,
    public filterService: FilterService,
    public opportunitiesService: OpportunitiesService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'CareersPage';
  }

  ngOnInit() {
    this.getOpportunities();
    this.filterService.newInternshipEvent.subscribe(event => this.onInternshipFilterChange(event));
    this.filterService.newOpportunityEvent.subscribe(event => this.onOpportunityFilterChange(event));
  }

  onOpportunityFilterChange(event): void {
    //TODO: CALL API WITH FILTER WHEN BACKEND IS READY
    console.log('got opportunity filter', event);
  }


  onInternshipFilterChange(event): void {
    //TODO: CALL API WITH FILTER WHEN BACKEND IS READY
    console.log('got internship filters', event);
  }

  reset(): void {
    this.limit = 20;
    this.offset = 0;
    this.input = '';
    if (this.infinite) this.infinite.enable(true);
  }


  openFilterModal(): void {
    let filter = this.pageToggle ? 'internships' : 'opportunities';
    let modal = this.modalCtrl.create('FilterPage', {filter: filter});
    modal.present();
  }

  search(type, event): void {
    this.reset();
    this.input = event.target.value;
    this.opportunitiesService.getOpportunities(type, this.input).subscribe((res: Model.Opportunity[]) => {
      this.opportunitiesList = res;
      this.offset = res.length;
    }, err => {
      console.log('There was an error', err);
    });
  }

  toggle(iternship: boolean): void {
    if (iternship) {
      this.pageToggle = true;
      this.currentType = 'Internship';
    } else {
      this.pageToggle = false;
      this.currentType = 'Other';
    }
    this.getOpportunities();
  }


  getOpportunities(): void {
    this.reset();
    this.opportunitiesService.getOpportunities(this.currentType).subscribe((res: Model.Opportunity[]) => {
      this.opportunitiesList = res;
      this.offset = res.length;
    }, err => {
      console.log('There was an error', err);
    });
  }


  doInfinite(infiniteScroll: any): void {
    this.opportunitiesService.getOpportunities(this.currentType, this.input, this.offset, this.limit)
      .subscribe((res: Model.Opportunity[]) => {
        this.opportunitiesList = this.opportunitiesList.concat(res);
        this.offset = this.offset + res.length;
        this.infinite = infiniteScroll;
        if (res.length < this.limit) infiniteScroll.enable(false);
        infiniteScroll.complete();
      }, err => {
        console.log('There was an error', err);
      });
  }





}
