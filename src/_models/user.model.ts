import { BaseUser } from './base-user.model';

export class User extends BaseUser {
  hometown: string;
  bio: string;
  scholarship_count?: number;
  prize_count?: number;
  opportunity_count?: number;
  career_count?: number;

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
    this.scholarship_count = data.scholarship_count || this.scholarship_count;
    this.prize_count = data.prize_count || this.prize_count;
    this.opportunity_count = data.opportunity_count || this.opportunity_count;
    this.career_count = data.career_count || this.career_count;
  }

}
