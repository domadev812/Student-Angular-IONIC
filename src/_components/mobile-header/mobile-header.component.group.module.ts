import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from './mobile-header.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
      declarations: [
        MobileHeaderComponent,
    ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    MobileHeaderComponent,
    ]
})
export class MobileHeaderModule {}