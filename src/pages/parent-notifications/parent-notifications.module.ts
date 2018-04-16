import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentNotificationsPage } from './parent-notifications';
import { MobileHeaderModule, NotificationsComponentModule } from '../../app/app.modules.list';
@NgModule({
  declarations: [
    ParentNotificationsPage,
  ],
  imports: [
    NotificationsComponentModule,
    IonicPageModule.forChild(ParentNotificationsPage),
    MobileHeaderModule,
  ],
})
export class ParentNotificationsPageModule {}
