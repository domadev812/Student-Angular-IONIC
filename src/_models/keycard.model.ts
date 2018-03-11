
export class Keycard {
    id: number;
    code: string;
    created_at: string;
    updated_at: string;
  
    constructor(data: any = null) {
      if (data) {
        this.id = data.id;
        this.code = data.code;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
      }
    }
  }
  