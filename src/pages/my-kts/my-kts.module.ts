import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyKtsPage } from './my-kts';
import { MyKtsModule } from '../../app/app.modules.list';

@NgModule({
  declarations: [
    MyKtsPage,
  ],
  imports: [
    MyKtsModule,
    IonicPageModule.forChild(MyKtsPage),
  ],
})
export class MyKtsPageModule {}
