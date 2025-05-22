import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { randText } from '@ngneat/falso';
import { delay, finalize, Observable, tap } from "rxjs";
import { Todo } from "./todo.model";

@Injectable({providedIn: 'root'})
export class TodoService {
  private http = inject(HttpClient)
  private _todos = signal<Todo[]>([]);
  private _loading = signal<boolean>(false);

  public todos = this._todos.asReadonly();
  public loading = this._loading.asReadonly();

  public getTodos(): Observable<Todo[]> {
    this._loading.set(true);
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
      delay(1000),
      tap((todos) => this._todos.set(todos)),
      finalize(() => this._loading.set(false))
    )
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    this._loading.set(true);
    const newTodo = {
      ...todo,
      title: randText(),
    }

    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${newTodo.id}`,
      JSON.stringify({
        todo: newTodo.id,
        title: newTodo.title,
        body: newTodo.body,
        userId: newTodo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    ).pipe(
      delay(1000),
      tap((todo) => {
        this._todos.update((todos) => todos.map((t) => t.id === todo.id ? todo : t))
      }),
      finalize(() => this._loading.set(false))
    )
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    this._loading.set(true);
    return this.http.delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`).pipe(
      delay(1000),
      tap(() => {
        this._todos.update((todos) => todos.filter((t) => t.id !== todo.id))
      }),
      finalize(() => this._loading.set(false))
    )
  }
}