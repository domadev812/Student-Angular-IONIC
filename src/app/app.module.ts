import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as Services from './app.services.list';
import { apiFactory } from '../_factories/api.factory';
import { NavigationModule } from './app.modules.list';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    NavigationModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {
      provide: Http,
      useFactory: apiFactory,
      deps: [XHRBackend, RequestOptions],
    },
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Services.AuthService,
    Services.CurrentUserService,
    Services.NavigationService,
    Services.MultiselectService,
    Services.FilterService,
    Services.ScholarshipsService,
    Services.ContactUsService,
    Services.NotificationsService,
    Services.OpportunitiesService,
    Services.AddressService,
    Services.OrganizationService,
    Services.PrizesService,
    Services.KeycardService,
    Services.AlertService,
  ]
})
export class AppModule { }
