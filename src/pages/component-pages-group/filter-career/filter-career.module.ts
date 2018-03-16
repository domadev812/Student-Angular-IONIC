import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterCareerPage } from './filter-career';
import { MyCareersModule } from '../../../_components/my-careers/my-careers.group.module';

@NgModule({
  declarations: [
    FilterCareerPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterCareerPage),    
    MyCareersModule
  ],
})
export class FilterPageModule {}
