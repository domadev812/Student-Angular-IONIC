
export class Notifications {
  id: number;
  title: string;
  description: string;
  // organization: Organization;
  amount: number;
  type: string;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.amount = data.amount;
  }
}