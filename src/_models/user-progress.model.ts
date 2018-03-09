import { Model } from '../app/app.models';


export class UserProgress {
  prizes: Array<Model.Prize>;
  scholarships: Array<Model.Scholarship>;
  internships: Array<Model.Opportunity>;
  other_opportunities: Array<Model.Opportunity>;

  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    this.prizes = Model.initializeArray(data.prizes, 'Prize') || this.prizes;
    this.scholarships = Model.initializeArray(data.scholarships, 'Scholarship') || this.scholarships;
    this.internships = Model.initializeArray(data.internships, 'Opportunity') || this.internships;
    this.other_opportunities = Model.initializeArray(data.other_opportunities, 'Opportunity') || this.other_opportunities;
  }
}
