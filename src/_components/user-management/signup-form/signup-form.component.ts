import { Component } from '@angular/core';
import { Model } from '../../../app/app.models';
import { AuthService, NavigationService, MultiselectService} from '../../../app/app.services.list';
import { ToastController, LoadingController, NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../../../app/app.validators.list';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { MultiSelectUtil } from '../../../_utils/multiselect.util';


@Component({
  selector: 'signup-form',
  templateUrl: 'signup-form.html'
})
export class SignupFormComponent {
  user: Model.User = new Model.User({});
  text: string;
  nextAttempt: boolean;
  confirmPassword: string;
  signupForm: FormGroup;
  signupForm2: FormGroup;
  formOneDone: boolean;
  isMobile: boolean;
  startBirthday = { date: { year: 2000, month: 1, day: 1 } };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: false
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
    public platform: Platform
  ) { }

  ngOnInit(): void {
    this.isMobile = this.platform.is('mobile');

    
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(20), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      school: [[], Validators.required],
      graduation_year: [[], Validators.required]
      });

    this.signupForm2 = this.formBuilder.group({
      birthday: [''],
      gender: ['']
    });


    this.multiselectService.getDropdownSchools().subscribe((res) => {
      this.schoolList = res;
    }, err => {
      console.log('err', err);
    });

    this.ktsSelectSettings = MultiSelectUtil.selectOptions({text: ' '});
    this.yearList = MultiSelectUtil.gradYearList;
    this.genderList = MultiSelectUtil.genderList;

  }

  invalid(control: FormControl): boolean {
    return !control.valid  && (control.dirty || this.nextAttempt);
  }

  valid(control: FormControl): boolean {
    return control.valid  && (control.dirty || this.nextAttempt);
  }

  onSchoolSelect(item: any): void {
    this.user.organization_id = item.id;
  }

  onDateChanged(event: IMyDateModel): void {
    this.user.birthday = new Date(event.jsdate);
  }

  onGenderSelect(item: any): void {
    this.user.gender = item.itemName;
  }


  next(isValid: boolean): void {
    this.nextAttempt = true;
    if (isValid) {
      this.formOneDone = true;
    }
  }

  signup(isValid: boolean): void {
    if (isValid) {
      let loader = this.loadingCtrl.create({
        content: 'Creating Account...',
      });
      loader.present().then(() => {
      this.authService
        .signup(this.user)
        .subscribe((res) => {
          this.navCtrl.setRoot(this.navService.HOME);
          loader.dismiss();
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
