import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressTrackerPage } from './progress-tracker';
import { MobileHeaderModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    ProgressTrackerPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressTrackerPage),
    MobileHeaderModule,
  ],
})
export class ProgressTrackerPageModule {}
