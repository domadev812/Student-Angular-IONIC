
export class Opportunity {
  id: number;
  active: boolean;
  title: string;
  description: string;  
  organization_name: string;
  constructor(data: any = null) {
    if (data) {
      this.id = data.id;
      this.active = data.active;
      this.title = data.title;
      this.description = data.description;
      this.organization_name = data.organization ? data.organization.name : '';
    }
  }
}