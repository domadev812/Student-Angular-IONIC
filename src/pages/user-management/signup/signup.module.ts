import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { UserManagementModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    UserManagementModule
  ],
})
export class SignupPageModule {}
