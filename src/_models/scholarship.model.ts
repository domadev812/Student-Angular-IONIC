
export class Scholarship {
  id: number;
  active: boolean;
  title: string;
  description: string;
  amount: number;
  in_app: boolean;

  constructor(data) {
    this.id = data.id;
    this.active = data.active;
    this.title = data.title;
    this.description = data.description;
    this.amount = data.amount;
    this.in_app = data.in_app;
  }
}