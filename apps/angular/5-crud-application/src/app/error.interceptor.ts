import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn):Observable<HttpEvent<unknown>> => {
    return next(req).pipe(
      catchError((error) => {
        if (error) {
          console.error('Error interceptor. Error: ', error);
        }
        return throwError(() => error);
      }),
    );
  };