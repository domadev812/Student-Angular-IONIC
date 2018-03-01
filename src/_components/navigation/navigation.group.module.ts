import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './nav/nav';
import { TabsNavComponent } from './tabs-nav/tabs-nav';

@NgModule({
    declarations: [
      NavigationComponent,
      TabsNavComponent
    ],
    imports: [
      IonicModule,
      HttpClientModule,
      InlineSVGModule.forRoot({ baseUrl: 'assets/' })      
    ],
    exports: [
      NavigationComponent,
      TabsNavComponent
    ]
  })
  export class NavigationModule {}
  