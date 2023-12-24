import { baseUrl } from "./config";

export interface ITodo {
  _id: string;
  userId: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoRequest {
  userId: string;
  title: string;
}

export interface UpdateTodoRequest {
  completed: boolean;
}

const todoUrl = `${baseUrl}/todos`;

export class TodoService {
  static async getTodos(): Promise<ITodo[]> {
    const url = todoUrl;

    const response = await fetch(url);
    const json = await response.json();

    return json;
  }

  static async createTodo(newTodo: CreateTodoRequest): Promise<ITodo> {
    const url = todoUrl;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...newTodo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }

    return response.json();
  }

  static async updateTodo(id: string, params: UpdateTodoRequest): Promise<ITodo> {
    const url = `${todoUrl}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }

    return response.json();
  }
}