import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderReviewPage } from './orderreview';

@NgModule({
  declarations: [
    OrderReviewPage,    
  ],
  imports: [
    IonicPageModule.forChild(OrderReviewPage),    
  ],
})
export class OrderReviewPageModule {}
