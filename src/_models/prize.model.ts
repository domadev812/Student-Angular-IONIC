
export class Prize {
  id: number;  
  title: string;
  points: number;
  description: string;
  organization: any;
  constructor(data) {
    this.id = data.id;    
    this.title = data.title;
    this.description = data.description;
    this.points = data.points;
    this.organization = data.organization;
  }
}