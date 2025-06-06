export interface User {
    _id: string;
    firstName: string;
    lastName: string
    email: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UsersResponse {
    users: User[];
    total: number;
    page: number;
    pages: number;
  }