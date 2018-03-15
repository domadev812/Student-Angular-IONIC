
export class CareerGroup {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;

  constructor(data: any = null) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    }
  }
}
