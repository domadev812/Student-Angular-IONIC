import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { NavigationService, FilterService, ScholarshipsService, AlertService } from '../../app/app.services.list';
import { Model } from '../../app/app.models';
import { Subscription } from 'rxjs/Subscription';
import { ImageUtil } from '../../_utils/image.util';

@IonicPage()
@Component({
  selector: 'page-scholarships',
  templateUrl: 'scholarships.html',
})
export class ScholarshipsPage {
  @ViewChild(Content)
  content: Content;

  scholarshipsList: Model.Scholarship[];
  limit = 20;
  offset = 0;
  input = '';
  infinite: any;
  my_filter: boolean;
  school_id: number;
  subscription: Subscription;
  isScrolled = false;
  title = 'Scholarships';
  public imageUrlCreate = ImageUtil.createImageUrl;
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public modalCtrl: ModalController,
    public filterService: FilterService,
    public scholarshipsService: ScholarshipsService,
    public alert: AlertService,
    public zone: NgZone,
  ) {
  }

  ionViewCanEnter() {
    this.navService.currentPage = 'ScholarshipsPage';
  }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.filterService.newScholarshipEvent.subscribe(event => this.onFilterChange(event));
    this.filterService.scholarshipFilterChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  onFilterChange(event): void {
    this.my_filter = event.myScholarships;
    if (event.scholarshipUniversity) {
      this.school_id = event.scholarshipUniversity.id;
    }
    this.getScholarships();
  }

  presentModal() {
    let modal = this.modalCtrl.create('FilterPage', { filter: 'scholarships' });
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
    this.scholarshipsService.getScholarships(this.my_filter, this.school_id).subscribe((res: Model.Scholarship[]) => {
      this.loading = false;
      this.scholarshipsList = res;
      this.offset = res.length;
    }, err => {
      this.loading = false;
      this.alert.handleError(err);
    });
  }

  searchScholarships(event): void {
    this.reset();
    this.input = event.target.value;
    this.scholarshipsService.getScholarships(this.my_filter, this.school_id, this.input).subscribe((res: Model.Scholarship[]) => {
      this.scholarshipsList = res;
      this.offset = res.length;
    }, err => {
      this.alert.handleError(err);
    });
  }

  doInfinite(infiniteScroll: any): void {
    this.scholarshipsService.getScholarships(this.my_filter, this.school_id,
      this.input, this.offset, this.limit).subscribe((res: Model.Scholarship[]) => {
        this.scholarshipsList = this.scholarshipsList.concat(res);
        this.infinite = infiniteScroll;
        infiniteScroll.complete();
        if (res.length < this.limit) infiniteScroll.enable(false);
      }, err => {
        this.alert.handleError(err);
      });
  }

  goToDetailPage(scholarshipId: string): void {
    this.navCtrl.push('ScholarshipDetailPage', { resourceId: scholarshipId });
  }
}
