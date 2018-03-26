import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorsPage } from './sponsors';
import { MobileHeaderModule } from '../../../app/app.modules.list';
@NgModule({
  declarations: [
    SponsorsPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsorsPage),
    MobileHeaderModule,
  ],
})
export class SponsorsPageModule {}
