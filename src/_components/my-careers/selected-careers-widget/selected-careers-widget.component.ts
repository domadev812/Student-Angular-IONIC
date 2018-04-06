import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CareersService } from '../../../app/app.services.list';

@Component({
  selector: 'selected-careers-widget',
  templateUrl: 'selected-careers-widget.component.html'
})
export class SelectedCareersWidgetComponent implements OnInit {
  private subscription: Subscription;
  private careers = [];  

  constructor(public careersService: CareersService) {}

  ngOnInit() {   
    this.subscription = this.careersService.careersEvent.subscribe(event => this.onCareersChange(event)); 
  }

  onCareersChange(event: any[]): void {    
    if (event) {
      this.careers = event.map(career => career);
    } else {
      this.careers = [];
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
