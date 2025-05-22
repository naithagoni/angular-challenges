import { Todo } from '../todo.model';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TodoService } from '../todo.service';
import { signal } from '@angular/core';

export const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  body: 'Test Body',
  userId: '1',
  completed: false
};

export const mockTodos: Todo[] = [mockTodo];

@Injectable()
export class TodoServiceMock implements Partial<TodoService> {
  private _todos = signal<Todo[]>([mockTodo]);
  private _loading = signal<boolean>(false);

  public todos = this._todos.asReadonly();
  public loading = this._loading.asReadonly();

  public getTodos = jest.fn().mockReturnValue(of(mockTodos));
  public updateTodo = jest.fn().mockReturnValue(of(mockTodo));
  public deleteTodo = jest.fn().mockReturnValue(of({}));
} 