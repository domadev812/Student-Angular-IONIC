import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressTrackerPage } from './progress-tracker';

@NgModule({
  declarations: [
    ProgressTrackerPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressTrackerPage),
  ],
})
export class ProgressTrackerPageModule {}
