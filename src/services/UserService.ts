import { baseUrl } from "./config";

export interface IUser {
  _id: string;
  username: string;
}

export interface CreateUserRequest {
  username: string;
}

const usersUrl = `${baseUrl}/users/`;

export class UserService {
  static async getUsers(): Promise<IUser[]> {
    const url = usersUrl;

    const response = await fetch(url);
    const json = await response.json();

    return json;
  }
  static async getUser(id: string): Promise<IUser> {
    const url = `${usersUrl}/${id}`;

    const response = await fetch(url);
    const json = await response.json();

    return json;
  }

  static async createUser(newUser: CreateUserRequest): Promise<IUser[]> {
    const url = usersUrl;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...newUser
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    console.log(response);
    
    if (!response.ok) {
      const json = await response.json();
      console.log(json);
      
      throw new Error(json.message);
    }

    return response.json();
  }
}