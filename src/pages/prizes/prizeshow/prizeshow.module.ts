import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrizeShowPage } from './prizeshow';
import { MobileHeaderModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    PrizeShowPage,
  ],
  imports: [
    IonicPageModule.forChild(PrizeShowPage),
    MobileHeaderModule,
  ],
})
export class PrizesPageModule { }
