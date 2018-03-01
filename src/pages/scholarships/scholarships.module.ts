import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScholarshipsPage } from './scholarships';

@NgModule({
  declarations: [
    ScholarshipsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScholarshipsPage),
  ],
})
export class ScholarshipsPageModule {}
