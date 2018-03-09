
export class Prize {
  id: number;
  title: string;
  points: number;
  description: string;
  organization: any;
  organization_name: string;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.points = data.points;
    this.organization = data.organization;
    this.organization_name = data.organization_name;
  }
}