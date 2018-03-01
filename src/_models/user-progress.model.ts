export class UserProgress {
  prizes: Array<string>;
  scholarships: Array<string>;
  internships: Array<string>;
  other_opportunities: Array<string>;

  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    this.prizes = data.prizes || this.prizes;
    this.scholarships = data.scholarships || this.scholarships;
    this.internships = data.internships || this.internships;
    this.other_opportunities = data.other_opportunities || this.other_opportunities;
  }
}
