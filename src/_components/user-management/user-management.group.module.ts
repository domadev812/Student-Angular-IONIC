import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MyDatePickerModule } from 'mydatepicker';
@NgModule({
    declarations: [
      LoginFormComponent,
      SignupFormComponent
    ],
    imports: [
      IonicModule,
      HttpClientModule,
      AngularMultiSelectModule,
      MyDatePickerModule,
      InlineSVGModule.forRoot({ baseUrl: 'assets/' })      
    ],
    exports: [
      LoginFormComponent,
      SignupFormComponent
    ]
  })
  export class UserManagementModule {}
  