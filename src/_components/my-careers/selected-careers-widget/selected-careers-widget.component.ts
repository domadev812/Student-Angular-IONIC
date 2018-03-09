import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
  selector: 'selected-careers-widget',
  templateUrl: 'selected-careers-widget.component.html'
})
export class SelectedCareersWidgetComponent implements OnInit {
  private _careers;
  length = 0;
  @Input()
  set careers(careers: any[]) {    
    if (careers) {      
      this._careers = careers;          
    } else {      
      this._careers = [];
    }
    this.length = this._careers.length;        
  }
  constructor() {
    this._careers = [];
  }

  ngOnInit() {    
  }
}
