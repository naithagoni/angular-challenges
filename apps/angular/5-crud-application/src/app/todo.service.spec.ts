import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { mockTodo, mockTodos } from './testing/todo.mock';
import { provideHttpClient } from '@angular/common/http';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty todos and loading false', () => {
    expect(service.todos()).toEqual([]);
    expect(service.loading()).toBeFalsy();
  });

  describe('getTodos', () => {
    it('should fetch todos and update state', (done) => {
      service.getTodos().subscribe(() => {
        expect(service.todos()).toEqual(mockTodos);
        expect(service.loading()).toBeFalsy();
        done();
      });

      expect(service.loading()).toBeTruthy();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
      expect(req.request.method).toBe('GET');
      req.flush(mockTodos);
    });
  });

  describe('updateTodo', () => {
    it('should update todo and update state', (done) => {
      service['_todos'].set([mockTodo]);

      service.updateTodo(mockTodo).subscribe((updatedTodo) => {
        expect(service.todos().find(t => t.id === mockTodo.id)).toEqual(updatedTodo);
        expect(service.loading()).toBeFalsy();
        done();
      });

      expect(service.loading()).toBeTruthy();

      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/${mockTodo.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ ...mockTodo, title: 'Updated Title' });
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo and update state', (done) => {
      service['_todos'].set([mockTodo]);

      service.deleteTodo(mockTodo).subscribe(() => {
        expect(service.todos().find(t => t.id === mockTodo.id)).toBeUndefined();
        expect(service.loading()).toBeFalsy();
        done();
      });

      expect(service.loading()).toBeTruthy();

      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/${mockTodo.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
}); 