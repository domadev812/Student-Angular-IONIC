import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScholarshipApplyPage } from './scholarshipapply';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@NgModule({
  declarations: [
    ScholarshipApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(ScholarshipApplyPage),
    FormsModule,
    AngularMultiSelectModule,
  ],
})
export class ScholarshipApplyPageModule {}
