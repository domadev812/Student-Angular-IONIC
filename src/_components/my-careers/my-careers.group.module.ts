import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { SelectedCareersWidgetComponent } from './selected-careers-widget/selected-careers-widget.component';
import { FilterCareersWidgetComponent } from './filter-careers/filter-careers.component';
@NgModule({
  declarations: [SelectedCareersWidgetComponent,
                 FilterCareersWidgetComponent],
  imports: [CommonModule,
            IonicModule,
            HttpClientModule,
            InlineSVGModule.forRoot({ baseUrl: 'assets/' })],
  exports: [SelectedCareersWidgetComponent,
            FilterCareersWidgetComponent]
})
export class MyCareersModule {}
