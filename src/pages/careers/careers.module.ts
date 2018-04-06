import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareersPage } from './careers';
import { FiltersModule, MobileHeaderModule } from '../../app/app.modules.list';



@NgModule({
  declarations: [
    CareersPage,
  ],
  imports: [
    IonicPageModule.forChild(CareersPage),
    FiltersModule,
    MobileHeaderModule,
  ],
})
export class CareersPageModule {}
