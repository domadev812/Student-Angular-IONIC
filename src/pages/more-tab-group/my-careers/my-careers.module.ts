import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCareersPage } from './my-careers';
import { MyCareersModule } from '../../../app/app.modules.list';
import { MobileHeaderModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    MyCareersPage,
  ],
  imports: [
    MyCareersModule,
    IonicPageModule.forChild(MyCareersPage),
    MobileHeaderModule,
  ],
})
export class MyCareersPageModule {}
