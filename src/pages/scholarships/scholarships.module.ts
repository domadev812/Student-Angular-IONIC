import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScholarshipsPage } from './scholarships';
import { FiltersModule, MobileHeaderModule } from '../../app/app.modules.list';

@NgModule({
  declarations: [
    ScholarshipsPage,    
  ],
  imports: [
    IonicPageModule.forChild(ScholarshipsPage),
    FiltersModule,
    MobileHeaderModule,
  ],
})
export class ScholarshipsPageModule {}
