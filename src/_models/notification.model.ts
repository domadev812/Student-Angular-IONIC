import { Organization } from './organization.model';

export class Notification {
  id: number;
  subject: string;
  body: string;
  organization_name: string;
  creator_name: string;
  approved: boolean;
  // organization: Model.Organization;
  organization: Organization;

  constructor(data = null) {
    if (data) {
      this.id = data.id;
      this.subject = data.subject;
      this.body = data.body;
      this.organization_name = data.organization_name;
      this.creator_name = data.creator_name;
      this.approved = data.approved;
      if (data.organization) {
        this.organization = new Organization(data.organization);
      } else {
        this.organization = new Organization();
      }      
      // this.organizations = Model.initializeArray(data.resource[0].organization || {}, 'Organization');
    }
  }
}