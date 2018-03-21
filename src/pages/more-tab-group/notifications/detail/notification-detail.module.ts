import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailPage } from './notification-detail';
import { MobileHeaderModule } from '../../../../app/app.modules.list';

@NgModule({
  declarations: [
    NotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailPage),
    MobileHeaderModule,
  ],
})
export class NotificationDetailPageModule {}
