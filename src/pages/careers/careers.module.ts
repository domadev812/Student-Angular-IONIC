import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareersPage } from './careers';

@NgModule({
  declarations: [
    CareersPage,
  ],
  imports: [
    IonicPageModule.forChild(CareersPage),
  ],
})
export class CareersPageModule {}
