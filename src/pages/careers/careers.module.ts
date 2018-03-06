import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareersPage } from './careers';
import { FiltersModule } from '../../_components/filters/filters.group.module';
@NgModule({
  declarations: [
    CareersPage,
  ],
  imports: [
    IonicPageModule.forChild(CareersPage),
    FiltersModule
  ],
})
export class CareersPageModule {}
