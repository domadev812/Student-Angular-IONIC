import { Component, Input } from '@angular/core';
import { AuthService, NavigationService, AlertService, CurrentUserService } from '../../../app/app.services.list';
import { ToastController, LoadingController, NavController, Platform } from 'ionic-angular';
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {
  private email: string;
  private password: string;
  @Input() redirectUrl: string;
  constructor(private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navService: NavigationService,
    public alert: AlertService,
    public currentUserService: CurrentUserService,
    public platform: Platform
  ) {

  }

  login(): void {
    let loader = this.loadingCtrl.create({
      content: 'Logging in...',
      spinner: 'none'
    });
    loader.present().then(() => {
      this.authService
        .login(this.email, this.password)
        .subscribe(async (response) => {
          if (response === true) {
            this.alert.toast('You have successfully logged in.');
            if (this.platform.is('android') || this.platform.is('ios')) {
              this.currentUserService.setRegistrationToken(await this.currentUserService.getRegistrationToken()).subscribe();
            }
            if (this.redirectUrl) {
              window.location.href = this.redirectUrl;
              loader.dismiss();
            } else {
              this.navCtrl.setRoot(this.navService.HOME);
              loader.dismiss();
            }
          }
        }, (err) => {
          let message = err.message ? `: ${err.message}` : '';
          let toast = this.toastCtrl.create({
            message: 'Login Failed' + message,
            duration: 2000,
            position: 'top',
            showCloseButton: true
          });
          toast.present();
          loader.dismiss();
        });
    });
  }

}
