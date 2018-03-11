
export class Address {
  id: number;  
  user_id: number;
  full_name: string;
  address_one: string;
  address_two: string;  
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  updated_at: Date;      
  created_at: Date;      
  constructor(data = null) {
    if (data) {
      this.id = data.id;
      this.user_id = data.user_id;
      this.full_name = data.full_name;
      this.address_one = data.address_one;
      this.address_two = data.address_two;
      this.city = data.city;
      this.state = data.state;
      this.zip_code = data.zip_code;
      this.phone_number = data.phone_number;
      this.updated_at = data.updated_at;
      this.created_at = data.created_at;
    }
  }
}