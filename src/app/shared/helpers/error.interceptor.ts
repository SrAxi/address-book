import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlertService } from '../alert';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const error = err.message || err.statusText;
      this.alertService.error(error, 5500);
      return throwError(error);
    }));
  }
}
