import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { NavigationService } from '../../../app/app.services.list';

@IonicPage()
@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html'
})
export class ToolsPage {
  // TODO: Change url values once project is done.
  toolsList = [
    {
      name: 'Career Cluster Inventory',
      url: 'https://utahfutures.org/assessments/career-cluster-traditional',
      is_mobile: true
    },
    {
      name: 'Interest Profiler',
      url: 'https://www.utahfutures.org/assessments/interest-profiler-traditional',
      is_mobile: true
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Reality Check',
      url: 'https://utahfutures.org/assessments/reality-check;jsessionid=6578B96973A3CCBCC2A6DEA928FB37AC#/budget',
      is_mobile: true
    },
    { name: 'Degree Finder', url: 'https://utahfutures.org/programs/search', is_mobile: true },
    { name: 'Occupation Search', url: 'https://utahfutures.org/occupations/search', is_mobile: true },
    // tslint:disable-next-line:max-line-length
    {
      name: 'ACT Prep',
      url:
        'https://www.learningexpresshub.com/productengine/LELIndex.html#/center/learningexpresslibrary/college-preparation-center/home/prepare-for-your-act-test',
      is_mobile: true
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Resume Builder',
      url: 'http://www.readwritethink.org/files/resources/interactives/resume_generator/',
      is_mobile: false
    },
    {
      name: 'FAFSA Help',
      url: 'https://stepuputah.com/paying-for-college/apply-for-financial-aid-fafsa/',
      is_mobile: true
    },
    { name: '8th Grade Checklist', url: 'https://stepuputah.com/grade/8th-grade/', is_mobile: true },
    { name: '9th Grade Checklist', url: 'https://stepuputah.com/grade/9th-grade/', is_mobile: true },
    { name: '10th Grade Checklist', url: 'https://stepuputah.com/grade/10th-grade/', is_mobile: true },
    { name: '11th Grade Checklist', url: 'https://stepuputah.com/grade/11th-grade/', is_mobile: true },
    { name: '12th Grade Checklist', url: 'https://stepuputah.com/grade/12th-grade/', is_mobile: true }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public viewCtrl: ViewController,
    private app: App
  ) {}

  ionViewCanEnter() {
    this.navService.currentPage = 'ToolsPage';
  }

  openURL(url: string): void {
    window.open(url, '_blank');
  }

  goToPage(page: string, event: any): void {
    this.app.getActiveNavs()[0].setRoot(page);
    this.dismissIfPopover();
  }

  dismissIfPopover() {
    if (this.viewCtrl.isOverlay) {
      this.viewCtrl.dismiss();
    }
  }

  goBack() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.goToPage('MyKtsPage', null);
    }
  }
}
