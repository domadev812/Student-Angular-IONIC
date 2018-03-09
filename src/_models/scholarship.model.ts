
export class Scholarship {
  id: number;
  active: boolean;
  title: string;
  description: string;
  amount: number;
  in_app: boolean;
  organization_name: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.active = data.active;
      this.title = data.title;
      this.description = data.description;
      this.amount = data.amount;
      this.in_app = data.in_app;
      this.organization_name = data.organization_name;
    }
  }
}