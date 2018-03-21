import { Component, Input } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
  selector: 'mobile-header',
  templateUrl: 'mobile-header.component.html'
})

export class MobileHeaderComponent {

  @Input() isScrolled = true;
  @Input() title;

  constructor() {
  }

}
