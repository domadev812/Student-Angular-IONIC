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
    this.scholarshipsService.getScholarships().subscribe((res: Model.Scholarship[]) => {
      this.scholarshipsList = res;
    }, err => console.log('There was an error', err));
  }


  onFilterChange(event): void {
    //TODO: CALL API WITH FILTER WHEN BACKEND IS READY
    console.log('got filters', event);
  }

  presentModal() {
    let modal = this.modalCtrl.create('FilterPage', {filter: 'scholarships'});
    modal.present();
  }

  searchScholarships(event) {
    const input = event.target.value;
    this.scholarshipsService.getScholarships(input).subscribe((res: Model.Scholarship[]) => {
      this.scholarshipsList = res;
    }, err => console.log('There was an error', err));
  }

  goToDetailPage(scholarshipId: string): void {
    this.navCtrl.push('ScholarshipDetailPage', {scholarshipId: scholarshipId});
  }
}
