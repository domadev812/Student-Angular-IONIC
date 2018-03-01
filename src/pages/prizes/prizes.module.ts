import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrizesPage } from './prizes';

@NgModule({
  declarations: [
    PrizesPage,
  ],
  imports: [
    IonicPageModule.forChild(PrizesPage),
  ],
})
export class PrizesPageModule {}
