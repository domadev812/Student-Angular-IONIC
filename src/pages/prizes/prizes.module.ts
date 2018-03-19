import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrizesPage } from './prizes';
import { MobileHeaderModule } from '../../app/app.modules.list';

@NgModule({
  declarations: [
    PrizesPage,
  ],
  imports: [
    IonicPageModule.forChild(PrizesPage),
    MobileHeaderModule,
  ],
})
export class PrizesPageModule {}
