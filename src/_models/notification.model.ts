import { Model } from '../app/app.models';

export class Notification {
  id: string;
  subject: string;
  body: string;
  organization_name: string;
  creator_name: string;
  approved: boolean;
  organization_id: string;
  organization: Model.Organization;
  type: string;
  resource: any;
  resource_id: string;
  types: ITypes;

  constructor(data = null) {
    if (data) {
      this.id = data.id || this.id;
      this.subject = data.subject || this.subject;
      this.body = data.body || this.body;
      this.organization_id = data.organization_id || this.organization_id;
      this.organization_name = data.organization_name || this.organization_name;
      this.creator_name = data.creator_name || this.creator_name;
      this.approved = data.approved;
      this.organization = new Model.Organization(data.organization || {});
      this.type = data.type || this.type;
      this.resource = data.resource || this.resource;
      this.resource_id = this.getResourceId();
      this.types = {
        scholarships: 'ScholarshipDetailPage',
        opportunities: 'OpportunityDetailPage',
        all: 'NotificationDetailPage',
        careers: 'NotificationDetailPage',
        gender: 'NotificationDetailPage',
        graduation_year: 'NotificatoinDetailPage',
      };
    }
  }

  getResourceId(): string {
    if (this.type === 'all' || this.type === 'careers' || this.type === 'gender' || this.type === 'graduation_year') {
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
  gender: any;
  graduation_year: any;
}
