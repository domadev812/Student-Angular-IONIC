import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigationService, AlertService } from '../../../app/app.services.list';
import { Model } from '../../../app/app.models';
import { MessageBoardService } from '../../../_services/messageboard.service';

@Component({
  selector: 'messageboard-widget',
  templateUrl: 'messageboard-widget.component.html'
})
export class MessageBoardWidgetComponent implements OnInit {
  messageBoard: Model.MessageBoard;
  message: string;
  link: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navService: NavigationService,
    public messageBoardService: MessageBoardService,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.messageBoard = new Model.MessageBoard({});
    this.getMessage();
  }

  openURL(): void {
    if (this.link.toLowerCase().lastIndexOf('http', 0) === 0) {
      window.open(this.link, '_blank');
    } else {
      window.open(`http://${this.link}`, '_system');
    }
  }

  getMessage() {
    this.messageBoardService.getMessage().subscribe(
      (res: Model.MessageBoard) => {
        if (res) {
          this.messageBoard = res;
          this.link = res.link;
          if (!res.message) {
            this.message = 'Welcome To Keys To Success';
          } else {
            this.message = res.message;
          }
        }
      },
      err => {
        this.alert.handleError(err.error);
      }
    );
  }
}
