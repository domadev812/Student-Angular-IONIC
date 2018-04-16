import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NotificationsComponent } from './notifications.component';
import { MobileHeaderModule } from '../../app/app.modules.list';

@NgModule({
  declarations: [
    NotificationsComponent,
  ],
  imports: [
    IonicModule,
    MobileHeaderModule,
  ],
  exports: [
    NotificationsComponent,
  ],
})
export class NotificationsComponentModule {}