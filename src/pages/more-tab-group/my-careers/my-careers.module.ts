import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCareersPage } from './my-careers';

@NgModule({
  declarations: [
    MyCareersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCareersPage),
  ],
})
export class MyCareersPageModule {}
