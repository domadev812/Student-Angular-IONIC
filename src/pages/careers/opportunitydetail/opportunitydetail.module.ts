import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpportunityDetailPage } from './opportunitydetail';
import { MobileHeaderModule } from '../../../app/app.modules.list';

@NgModule({
  declarations: [
    OpportunityDetailPage,    
  ],
  imports: [
    IonicPageModule.forChild(OpportunityDetailPage),    
    MobileHeaderModule,
  ],
})
export class OpportunityDetailPageModule {}
