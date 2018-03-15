import { Model } from '../app/app.models';

export class Notification {
  id: number;
  subject: string;
  body: string;
  organization_name: string;
  creator_name: string;
  approved: boolean;
  organization: Model.Organization;

  constructor(data = null) {
    if (data) {
      this.id = data.id;
      this.subject = data.subject;
      this.body = data.body;
      this.organization_name = data.organization_name;
      this.creator_name = data.creator_name;
      this.approved = data.approved;
      this.organization = new Model.Organization(data.organization || {});
    }
  }
}