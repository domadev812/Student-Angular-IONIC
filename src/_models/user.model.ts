import { ENV } from '../config/config.dev';
import { BaseUser } from './base-user.model';

export class User extends BaseUser {
  hometown: string;
  bio: string;

  constructor(data = null) {
    super();
    if (data) {      
      this.setData(data);
    }
  }

  setData(data) {
    super.setData(data);
    this.hometown = data.hometown || this.hometown;
    this.bio = data.bio || this.bio;
  }

}
