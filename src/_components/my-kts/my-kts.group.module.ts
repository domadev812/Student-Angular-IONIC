import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProgressWidgetComponent } from './progress-widget/progress-widget.component';
import { NotificationsWidgetComponent } from './notifications-widget/notifications-widget.component';
import { GetStartedBannerComponent } from './get-started-banner/get-started-banner.component';


@NgModule({
  declarations: [
    ProgressWidgetComponent,
    NotificationsWidgetComponent,
    GetStartedBannerComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ProgressWidgetComponent,
    NotificationsWidgetComponent,
    GetStartedBannerComponent
  ]
})
export class MyKtsModule { }
