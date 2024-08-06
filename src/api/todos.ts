import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1125;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const createTodo = (todo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos/`, todo);
};

export const changeCompletedTodo = (todoId: number, todo: Todo) => {
  return client.patch(`/todos/${todoId}`, todo);
};