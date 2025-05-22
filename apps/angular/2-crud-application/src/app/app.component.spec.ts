import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { mockTodo, TodoServiceMock } from './testing/todo.mock';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      providers: [
        { provide: TodoService, useClass: TodoServiceMock },
        provideHttpClientTesting(),
        provideAnimations()
      ]
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', fakeAsync(() => {
    fixture.detectChanges();
    tick(1000);

    expect((todoService as any).getTodos).toHaveBeenCalled();
    expect(component.todos()).toEqual([mockTodo]);
  }));

  it('should update todo', fakeAsync(() => {
    fixture.detectChanges();
    component.updateTodo(mockTodo);
    tick(1000);

    expect((todoService as any).updateTodo).toHaveBeenCalledWith(mockTodo);
  }));

  it('should delete todo', fakeAsync(() => {
    fixture.detectChanges();
    component.deleteTodo(mockTodo);
    tick(1000);

    expect((todoService as any).deleteTodo).toHaveBeenCalledWith(mockTodo);
  }));

  it('should show loading spinner when loading is true', () => {
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show todo list when loading is false', () => {
    fixture.detectChanges();

    const todoList = fixture.nativeElement.querySelector('ul');
    expect(todoList).toBeTruthy();
    expect(todoList.textContent).toContain(mockTodo.title);
  });
}); 