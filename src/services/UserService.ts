import { baseUrl } from "./config";

export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
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
}