import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunityDetailPage } from './opportunitydetail';

@NgModule({
  declarations: [
    OpportunityDetailPage,    
  ],
  imports: [
    IonicPageModule.forChild(OpportunityDetailPage),    
  ],
})
export class OpportunityDetailPageModule {}
