import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderFormPage } from './orderform';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@NgModule({
  declarations: [
    OrderFormPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderFormPage),
    FormsModule,
    AngularMultiSelectModule,
  ],
})
export class OrderFormPageModule {}
