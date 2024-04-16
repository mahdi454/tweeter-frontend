export interface GenericResponse {
    status: string;
    message: string;
  }
  
  export interface IResetPasswordRequest {
    resetToken: string;
    password: string;
    passwordConfirm: string;
  }
  
  export interface IPostRequest {
    title: string;
    content: string;
    image: string;
    user: string;
  }
  
  export interface IUser {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    username?: string;
    name?: string;
    password: string;
    image?: string;
    bio?: string;
    birthDate?: Date;
    isVerified?: boolean;
    emailToken?: string;
    expiration?: Date;
    tweets?:ITweetResponse[];
    friends?: string[] 
  }
  
  export interface ITweet {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    image?: string | null;
    impression?: number;
    userId: string;
  }
  export interface ITweetResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    image?: string | null;
    impression?: number;
    userId: string;
    user?: {
      id: string;
      username: string;
      name: string | null;
      image?: string | null;
    };
  }
  


  
