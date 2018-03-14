import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProgressWidgetComponent } from './progress-widget/progress-widget.component';
import { NotificationsWidgetComponent } from './notifications-widget/notifications-widget.component';
import { NotificationsService } from '../../app/app.services.list';


@NgModule({
  declarations: [ProgressWidgetComponent,
    NotificationsWidgetComponent,
    NotificationsWidgetComponent,

  ],
  imports: [
    IonicModule
  ],
  exports: [ProgressWidgetComponent,
    NotificationsWidgetComponent,
    NotificationsWidgetComponent,
  ]
})
export class MyKtsModule { }
