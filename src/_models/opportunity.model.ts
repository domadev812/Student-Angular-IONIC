
export class Opportunity {
  id: number;
  is_active: boolean;
  title: string;
  type: string;
  details: string;
  updated_at: Date;
  organization: any;
  organization_id: number;
  organization_name: string;
  link: string;


  constructor(data: any = null) {
    if (data) {
      this.id = data.id;
      this.is_active = data.is_active;
      this.title = data.title;
      this.type = data.type;
      this.updated_at = data.updated_at;
      this.details = data.details;
      this.organization = data.organization;
      this.organization_id = data.organization_id;
      this.link = data.link;
      this.organization_name = data.organization_name;
    }
  }
}
