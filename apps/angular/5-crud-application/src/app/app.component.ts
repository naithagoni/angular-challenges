import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { take } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loading()) {
    <div class="flex items-center justify-center h-screen">
      <mat-spinner diameter="40"></mat-spinner>
    </div>
    }@else {
    <ul class="list-none list-inside space-y-2 p-4">
      @for (todo of todos(); track todo.id) {
        <li class="flex items-center justify-between gap-2">
          <span>{{ todo.title }}</span>
          <div class="flex gap-2">
            <button class="bg-blue-500 text-white px-2 py-1 rounded-md" (click)="updateTodo(todo)">Update</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded-md" (click)="deleteTodo(todo)">Delete</button>
          </div>
        </li>
      }
    </ul>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService)
  public todos = this.todoService.todos;
  public loading = this.todoService.loading;
  
  public updateTodo = (todo: Todo) => {
    this.todoService.updateTodo(todo).pipe(take(1)).subscribe();
  }
  
  public deleteTodo = (todo: Todo) => {
    this.todoService.deleteTodo(todo).pipe(take(1)).subscribe();
  }

  public ngOnInit(): void {
    this.todoService.getTodos().pipe(take(1)).subscribe();
  }
}
