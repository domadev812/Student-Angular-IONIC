import { NgModule } from '@angular/core';
import { ProgressWidgetComponent } from './progress-widget/progress-widget.component';
import { NotificationsWidgetComponent } from './notifications-widget/notifications-widget.component';

@NgModule({
      declarations: [ProgressWidgetComponent,
    NotificationsWidgetComponent,
    NotificationsWidgetComponent,
    ],
  imports: [],
  exports: [ProgressWidgetComponent,
    NotificationsWidgetComponent,
    NotificationsWidgetComponent,
    ]
})
export class MyKtsModule {}
