import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScholarshipDetailPage } from './scholarshipdetail';

@NgModule({
  declarations: [
    ScholarshipDetailPage,    
  ],
  imports: [
    IonicPageModule.forChild(ScholarshipDetailPage),    
  ],
})
export class ScholarshipDetailPageModule {}
