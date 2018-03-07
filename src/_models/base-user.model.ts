import { ENV } from '../config/config.dev';

export class BaseUser {
  email: string;
  username: string;
  first_name: string; 
  last_name: string;
  id: string;
  password: string;
  organization_id: number;
  birthday: Date;
  ethnicity_id: string;
  gender: string;
  phone_number: string;
  profile_image: string;
  reset_pass_exp: string;
  reset_pass_token: string;
  roles: string[];
  fullName: Function;
  points: number;
  constructor() {
    
  }

  setData(data) {
    this.email = data.email || this.email;
    this.username = data.username || this.username;
    this.first_name = data.first_name || this.first_name;
    this.last_name = data.last_name || this.last_name;
    this.id = data.id || this.id;
    this.password = data.password || this.password;
    this.organization_id = data.organization_id || this.organization_id;
    this.birthday = data.birthday || this.birthday;
    this.ethnicity_id = data.ethnicity_id || this.ethnicity_id;
    this.gender = data.gender || this.gender;
    this.phone_number = data.phone_number || this.phone_number;
    data.images ? this.profile_image = data.images[0] : this.profile_image = null;
    this.reset_pass_exp = data.reset_pass_exp || this.reset_pass_exp;
    this.reset_pass_token = data.reset_pass_token || this.reset_pass_token;
    this.roles = data.roles || this.roles;
    this.points = data.points || this.points;
  }

  getName(): string | undefined {
    if (this.first_name && this.last_name) {
      return `${this.first_name} ${this.last_name}`;
    } else if (this.first_name || this.last_name) {
      return this.first_name || this.last_name;
    } else {
      return undefined;
    }
  }

  getInitials(): string {
    if (this.first_name && this.last_name) {
      return `${this.first_name[0]}${this.last_name[0]}`.toUpperCase();
    } else {
      return this.email.substring(0, 2).toUpperCase();
    }
  }

  getAvatarUrl(): string | undefined {
    if (this.profile_image) {
      return `${ENV.API_URL}/assets/images/${this.id}/${this.profile_image}`;
    } else {
      return 'assets/icon/account_icon.svg';
    }
  }

  getNameOrEmail(): string {
    if (this.first_name || this.last_name) {
      return this.getName();
    } else {
      return this.email;
    }
  }
}
