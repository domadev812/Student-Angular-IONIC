import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPage } from './filter';
import { FiltersModule } from '../../../_components/filters/filters.group.module';

@NgModule({
  declarations: [
    FilterPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPage),
    FiltersModule
  ],
})
export class FilterPageModule {}
