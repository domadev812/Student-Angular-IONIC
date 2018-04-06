import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FilterCareersService, AlertService, CareersService, CurrentUserService, AuthService } from '../../app/app.services.list';
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
  public isMobile: boolean;
  public modalPresent = false;
  public modalListener;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public filterCareersService: FilterCareersService,
    public alert: AlertService,
    public careerService: CareersService,
    public currentUserService: CurrentUserService,
    public authProvider: AuthService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getScreenSize();
    if (this.isMobile) {
      this.presentModal();
    }
    this.modalListener = this.renderer.listen('window', 'resize', (event) => {
      if (window.innerWidth < 768) {
        if (this.modalPresent === false) {
          this.presentModal();
        }
      } else if (window.innerWidth > 768) {
        if (this.modalPresent === true) {
          this.modalPresent = false;
        }
      }
    });
    this.filterCareersList = new Array<Model.Career>();
    this.selectedCareers = new Array<Model.Career>();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.filterCareersService.selectedCategory = null;
    localStorage.removeItem('searchBy');
  }

  onCategoryChange(event): void {
    if (!this.careersList) {
      return;
    }
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

  saveCareers(): void {   
    let career_ids = this.selectedCareers.map(career => career.id);
    this.careerService.addUserCareers(career_ids).subscribe((res: boolean) => {
      this.alert.toast('Add user careers successfully');
      this.filterCareersService.selectedCategory = null;
      this.navCtrl.push('MyCareersPage');
    }, err => {
      this.alert.handleError(err);
    });
  }

  getScreenSize(): void {
    if (window.innerWidth > 768) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }

  presentModal(): void {
    this.modalPresent = true;
    let modal = this.modalCtrl.create('FilterCareerPage');
    modal.present({duration: 10});
  }

}
