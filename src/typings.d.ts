declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare namespace API {
  namespace Response {
    interface Auth {
      token: string
      user: IUser
    }
  }

  interface IUser {
    email: string
    username: string
    first_name: string
    last_name: string
    id: string
    password: string
    organization_id: number;
    birthday: Date;    
    gender: string;
    phone_number: string
    hometown: string
    bio: string
    profile_image: string
    reset_pass_exp: string
    reset_pass_token: string
    roles: string[]
  }

}

declare namespace ForgotPassword {
  interface IForgot{
    email: string
  }
  interface IVerify{
    email: string,
    token: string
  }
  interface IChangePassword{
    email: string,
    token: string,
    password: string,
    password_confirmation: string
  }
  interface Response{
    message: string
  }
}
declare namespace Dialog {

  interface IData {
    id: string,
    index: number
  }
  
}
