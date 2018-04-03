import { Model } from '../app/app.models';

export class Notification {
  id: string;
  subject: string;
  body: string;
  organization_name: string;
  creator_name: string;
  approved: boolean;
  organization: Model.Organization;
  type: string;
  resource: any;
  resource_id: string;
  types: ITypes;

  constructor(data = null) {
    if (data) {
      this.id = data.id;
      this.subject = data.subject;
      this.body = data.body;
      this.organization_name = data.organization_name;
      this.creator_name = data.creator_name;
      this.approved = data.approved;
      this.organization = new Model.Organization(data.organization || {});
      this.type = data.type;
      this.resource = data.resource;
      this.resource_id = this.getResourceId();
      this.types = {
        scholarships: 'ScholarshipDetailPage',
        opportunities: 'OpportunityDetailPage',
        all: 'NotificationDetailPage',
        careers: 'NotificationDetailPage'
      };
    }
  }

  getResourceId(): string {
    if (this.type === 'all' || this.type === 'careers') {
      return this.id;
    } else {
      return this.resource[0].id;
    }
  }

  getRoute(): string {
    return this.types[this.type] || 'NotificationDetailPage';
  }
}

interface ITypes {
  scholarships: any;
  opportunities: any;
  all: any;
  careers: any;
}
