import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SelectedCareersWidgetComponent } from './selected-careers-widget/selected-careers-widget.component';

@NgModule({
      declarations: [SelectedCareersWidgetComponent],
  imports: [CommonModule],
  exports: [SelectedCareersWidgetComponent]
})
export class MyCareersModule {}
