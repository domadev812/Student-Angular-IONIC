import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { CareersSelectPage } from './careers-select';

@NgModule({
  declarations: [
    CareersSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CareersSelectPage),
    InlineSVGModule.forRoot({ baseUrl: 'assets/' })
  ],
})
export class CareersSelectPageModule {}
