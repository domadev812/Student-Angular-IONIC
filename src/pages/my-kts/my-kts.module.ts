import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyKtsPage } from './my-kts';
import { MyKtsModule } from '../../app/app.modules.list';
import { InlineSVGModule } from 'ng-inline-svg';
import { MobileHeaderModule } from '../../app/app.modules.list';

@NgModule({
  declarations: [
    MyKtsPage,
  ],
  imports: [
    MyKtsModule,
    IonicPageModule.forChild(MyKtsPage),
    InlineSVGModule.forRoot({ baseUrl: 'assets/' }),
    MobileHeaderModule,
  ],
})
export class MyKtsPageModule {}
