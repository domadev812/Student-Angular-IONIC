import { Model } from '../app/app.models';

export class Career {
  id: number;
  title: string; 
  careerGroup: Model.CareerGroup[];
  created_at: string;
  updated_at: string;

  constructor(data = null) {
    if (data) {
      this.id = data.id;
      this.title = data.title;    
      if (data.career_groups) {
        this.careerGroup = data.career_groups.map(career_group => new Model.CareerGroup(career_group));
      } else {
        this.careerGroup = [];
      }
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    }
  }
}