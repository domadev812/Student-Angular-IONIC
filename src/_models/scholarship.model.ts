
export class Scholarship {
  id: number;
  active: boolean;
  title: string;
  description: string;
  amount: number;

  constructor(data) {
    this.id = data.id;
    this.active = data.active;
    this.title = data.title;
    this.description = data.description;
    this.amount = data.amount;
  }
}