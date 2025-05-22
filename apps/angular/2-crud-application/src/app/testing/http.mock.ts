import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export const mockHttpResponse = new HttpResponse({ status: 200 });

export const mockHttpError = new HttpErrorResponse({ 
  status: 404, 
  statusText: 'Not Found' 
}); 