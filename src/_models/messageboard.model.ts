import { Model } from '../app/app.models';

export class MessageBoard {
  id: string;
  message: string;
  link: string;

  constructor(data = null) {
    if (data) {
      this.id = data.id;
      this.message = data.message;
      this.link = data.link;
    }
  }
}