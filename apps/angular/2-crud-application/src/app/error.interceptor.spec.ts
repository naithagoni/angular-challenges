import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { errorInterceptor } from './error.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { mockHttpResponse, mockHttpError } from './testing/http.mock';

describe('ErrorInterceptor', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting()
      ]
    });
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should pass through successful requests', (done) => {
    const mockRequest = new HttpRequest('GET', '/test');
    const mockNext = {
      handle: () => of(mockHttpResponse)
    } as HttpHandler;

    const result$ = errorInterceptor(mockRequest, mockNext.handle);

    result$.subscribe({
      next: (event) => {
        expect(event).toBe(mockHttpResponse);
        expect(consoleSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('should handle and log errors', (done) => {
    const mockRequest = new HttpRequest('GET', '/test');
    const mockNext = {
      handle: () => throwError(() => mockHttpError)
    } as HttpHandler;

    const result$ = errorInterceptor(mockRequest, mockNext.handle);

    result$.subscribe({
      error: (error) => {
        expect(error).toBe(mockHttpError);
        expect(consoleSpy).toHaveBeenCalledWith('Error interceptor. Error: ', mockHttpError);
        done();
      }
    });
  });
}); 