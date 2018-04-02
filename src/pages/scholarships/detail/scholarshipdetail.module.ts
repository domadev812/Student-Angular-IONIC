import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScholarshipDetailPage } from './scholarshipdetail';
import { MobileHeaderModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    ScholarshipDetailPage,    
  ],
  imports: [
    IonicPageModule.forChild(ScholarshipDetailPage),    
    MobileHeaderModule,
  ],
})
export class ScholarshipDetailPageModule {}
