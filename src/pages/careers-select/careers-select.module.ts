import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { CareersSelectPage } from './careers-select';
import { MyCareersModule } from '../../app/app.modules.list';
@NgModule({
  declarations: [
    CareersSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CareersSelectPage),
    InlineSVGModule.forRoot({ baseUrl: 'assets/' }),
    MyCareersModule
  ],
})
export class CareersSelectPageModule {}
