import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { FilterScholarshipsComponent } from './filter-scholarships/filter-scholarships.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
    declarations: [
      FilterScholarshipsComponent
    ],
    imports: [
      IonicModule,
      HttpClientModule,
      InlineSVGModule.forRoot({ baseUrl: 'assets/' }),
      AngularMultiSelectModule     
    ],
    exports: [
      FilterScholarshipsComponent
    ]
  })
  export class FiltersModule {}
  