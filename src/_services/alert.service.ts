import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertService {

  constructor(public http: Http,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  toast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

  handleError(err: any): void {
    let message = 'Error:' + err.message ? `Error: ${err.message}` : '';
    this.toast(message);
  }

  deleteConfirm(title: string = null,
    message: string = null,
    data: {} = null,
    callback: Function = null
  ) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'cancel-alert-button'
        },
        {
          text: 'Delete',
          cssClass: 'delete-alert-button',
          handler: () => {
            callback(data);
          }
        }
      ]
    });
    confirm.present();

  }

  reportConfirm(title: string = null,
    message: string = null,
    id: number = null,
    callback: Function = null) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'cancel-alert-button'
        },
        {
          text: 'Report',
          cssClass: 'delete-alert-button',
          handler: () => {
            callback(id);
          }
        }
      ]
    });
    confirm.present();
  }

}
