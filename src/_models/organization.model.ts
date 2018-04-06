export class Organization {
  id: string;
  name: string;
  school_id: string;
  type: string;
  url: string;
  updated_at: Date;
  created_at: Date;
  images: any;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.school_id = data.school_id;
      this.type = data.type;
      this.url = data.url;
      this.updated_at = data.updated_at;
      this.created_at = data.created_at;
      this.images = data.images || [];
    }
  }
}