import { Component } from '@angular/core';
import { Model } from '../../../app/app.models';
import { AuthService, NavigationService, MultiselectService, AlertService, CurrentUserService } from '../../../app/app.services.list';
import { ToastController, LoadingController, NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';

@Component({
  selector: 'signup-form',
  templateUrl: 'signup-form.html'
})
export class SignupFormComponent {
  user: Model.User = new Model.User({});
  text: string;
  nextAttempt = false;
  submitAttempt = false;
  confirmPassword: string;
  signupForm: FormGroup;
  signupForm2: FormGroup;
  formOneDone: boolean;
  isMobile: boolean;
  startBirthday: any;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: false,
    yearSelector: true,
  };
  ktsSelectSettings: Object = {};
  schoolList: Object[] = [];
  selectedSchool: Object[] = [];
  yearList: Object[] = [];
  selectedYear: Object[] = [];
  genderList: Object[] = [];
  selectedGender: Object[] = [];

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private multiselectService: MultiselectService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navService: NavigationService,
    public platform: Platform,
    public alert: AlertService,
    public currentUserService: CurrentUserService
  ) { }

  ngOnInit(): void {
    this.isMobile = this.platform.is('mobile');
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(20), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.maxLength(100), Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[^@][^@]/)])],
      school: [[], Validators.required],
      graduation_year: [[], Validators.required]
    });

    this.signupForm2 = this.formBuilder.group({
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    });


    this.multiselectService.getDropdownSchools().subscribe((res) => {
      this.schoolList = res;
    }, err => {
      this.alert.handleError(err);
    });

    this.ktsSelectSettings = MultiSelectUtil.selectOptions({ text: ' ' });
    this.yearList = MultiSelectUtil.setGradYear();
    this.genderList = MultiSelectUtil.genderList;
    this.startBirthday = this.setDate();
  }

  setDate() {
    let date = new Date();
    this.signupForm2.patchValue({
      birthday: {
        date: {
          year: date.getFullYear() - 14,
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      },
    });
  }


  invalid(control: FormControl): boolean {
    return !control.valid && (control.dirty || this.nextAttempt);
  }

  valid(control: FormControl): boolean {
    return control.valid && (control.dirty || this.nextAttempt);
  }

  invalid2(control: FormControl): boolean {
    return !control.valid && (control.dirty || this.submitAttempt);
  }

  valid2(control: FormControl): boolean {
    return control.valid && (control.dirty || this.submitAttempt);
  }

  onSchoolSelect(item: any): void {
    this.user.organization_id = item.id;
    this.user.organization_name = item.itemName;
  }

  onGraduationYearSelect(item: any): void {
    this.user.graduation_year = item.itemName;
  }

  onDateChanged(event: IMyDateModel): void {
    this.setDate();
    this.user.birthday = new Date(event.jsdate);
  }

  onGenderSelect(item: any): void {
    this.user.gender = item.itemName;
    if (this.user.gender === 'Male') {
      this.user.gender = 'M';
    } else if (this.user.gender === 'Female') {
      this.user.gender = 'F';
    } else (this.user.gender = 'O');

  }

  next(isValid: boolean): void {
    this.nextAttempt = true;
    if (isValid) {
      this.formOneDone = true;
    }
  }

  back(): void {
    this.formOneDone = false;
  }

  backHome(): void {
    this.navCtrl.push('LoginPage');
  }

  signup(isValid: boolean): void {

    this.submitAttempt = true;
    if (isValid) {

      if (!this.user.birthday) {
        return;
      }
      let loader = this.loadingCtrl.create({
        content: 'Creating Account...',
      });
      loader.present().then(() => {
        this.authService
          .signup(this.user)
          .subscribe(async (res) => {
            if (this.platform.is('android') || this.platform.is('ios')) {
              this.currentUserService.setRegistrationToken(await this.currentUserService.getRegistrationToken());
            }
            this.navCtrl.setRoot(this.navService.TUTORIAL);
            loader.dismiss();
            this.alert.toast('Account Created Successfully');
          }, (err) => {
            let message = err.message ? `: ${err.message}` : '';
            let toast = this.toastCtrl.create({
              message: 'Sign up Failed' + message,
              duration: 2000,
              position: 'top',
              showCloseButton: true
            });
            toast.present();
            loader.dismiss();
          });
      });
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please complete all fields',
        duration: 2000,
        position: 'top',
        showCloseButton: true
      });
      toast.present();
    }
  }



}
