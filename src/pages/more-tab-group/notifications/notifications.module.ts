import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { MobileHeaderModule } from '../../../app/app.modules.list';
@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    MobileHeaderModule,
  ],
})
export class NotificationsPageModule {}
