import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from './mobile-header.component';


@NgModule({
      declarations: [
        MobileHeaderComponent,
    ],
  imports: [
    CommonModule,
  ],
  exports: [
    MobileHeaderComponent,
    ]
})
export class MobileHeaderModule {}