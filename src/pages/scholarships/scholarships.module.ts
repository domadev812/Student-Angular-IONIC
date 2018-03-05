import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScholarshipsPage } from './scholarships';
import { FiltersModule } from '../../_components/filters/filters.group.module';

@NgModule({
  declarations: [
    ScholarshipsPage,    
  ],
  imports: [
    IonicPageModule.forChild(ScholarshipsPage),
    FiltersModule
  ],
})
export class ScholarshipsPageModule {}
