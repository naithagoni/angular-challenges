import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { errorInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([errorInterceptor]))],
};
