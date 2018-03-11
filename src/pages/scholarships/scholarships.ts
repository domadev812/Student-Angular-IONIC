import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NavigationService, FilterService, ScholarshipsService} from '../../app/app.services.list';
import { Model } from '../../app/app.models';

@IonicPage()
@Component({
  selector: 'page-scholarships',
  templateUrl: 'scholarships.html',
})
export class ScholarshipsPage {
  scholarshipsList: Model.Scholarship[];
  limit = 20;
  offset = 0;
  input = '';
  infinite: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public modalCtrl: ModalController,
    public filterService: FilterService,
    public scholarshipsService: ScholarshipsService
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipsPage';
  }

  ngOnInit() {
    this.filterService.newScholarshipEvent.subscribe(event => this.onFilterChange(event));
    this.getScholarships();
  }

  
  onFilterChange(event): void {
    //TODO: CALL API WITH FILTER WHEN BACKEND IS READY
    // this.reset();
    console.log('got filters', event);
  }

  presentModal() {
    let modal = this.modalCtrl.create('FilterPage', {filter: 'scholarships'});
    modal.present();
  }

  reset(): void {
    this.limit = 20;
    this.offset = 0;
    this.input = '';
    if (this.infinite) this.infinite.enable(true);
  }

  getScholarships(): void {
    this.reset();
    this.scholarshipsService.getScholarships().subscribe((res: Model.Scholarship[]) => {
      this.scholarshipsList = res;
      this.offset = res.length;
    }, err => console.log('There was an error', err));
  }

  searchScholarships(event): void {
    this.reset();
    this.input = event.target.value;
    this.scholarshipsService.getScholarships(this.input).subscribe((res: Model.Scholarship[]) => {
      this.scholarshipsList = res;
      this.offset = res.length;
    }, err => console.log('There was an error', err));
  }


  doInfinite(infiniteScroll: any): void {
    this.scholarshipsService.getScholarships(this.input, this.offset, this.limit).subscribe((res: Model.Scholarship[]) => {
      this.scholarshipsList = this.scholarshipsList.concat(res);
        this.infinite = infiniteScroll;
        infiniteScroll.complete();
        if (res.length < this.limit) infiniteScroll.enable(false);
    }, err => console.log('There was an error', err));
  }

  goToDetailPage(scholarshipId: string): void {    
    this.navCtrl.push('ScholarshipDetailPage', {scholarshipId: scholarshipId});
  }
}
