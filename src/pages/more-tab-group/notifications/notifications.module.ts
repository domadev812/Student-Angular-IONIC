import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { MobileHeaderModule, NotificationsComponentModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    NotificationsComponentModule,
    IonicPageModule.forChild(NotificationsPage),
    MobileHeaderModule,
  ],
})
export class NotificationsPageModule {}
