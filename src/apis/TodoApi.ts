import axios, { AxiosPromise } from 'axios';
import { Todo } from '../models/Todo';
import { url } from './BaseApi';

export const createTodo = (todo: Todo): AxiosPromise<Todo> => {
  const headers = { 'Content-Type': 'application/json' };
  const data: Partial<Todo> = { ...todo, id: undefined, tsCreate: undefined, tsUpdate: undefined };
  return axios.post<Todo>(`${url}/todos`, data, { headers });
};

export const readTodos = (): AxiosPromise<Todo[]> => axios.get<Todo[]>(`${url}/todos`);

export const readTodo = (todoId: number): AxiosPromise<Todo> => axios.get<Todo>(`${url}/todos/${todoId}`);

export const updateTodo = (todo: Partial<Todo>): AxiosPromise<Todo> => {
  const headers = { 'Content-Type': 'application/json' };
  const data: Partial<Todo> = { ...todo, id: undefined, tsCreate: undefined, tsUpdate: undefined };
  return axios.patch<Todo>(`${url}/todos/${todo.id}`, data, { headers });
};

export const deleteTodo = (todoId: number): AxiosPromise<void> => axios.delete<void>(`${url}/todos/${todoId}`);
