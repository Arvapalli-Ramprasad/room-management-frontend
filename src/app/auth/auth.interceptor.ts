import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    // Skip attaching token for login and register requests
    const isLoginOrRegister =
      request.url.includes('/generateToken') ||
      request.url.includes('/addNewUser')||
      request.url.includes('/set-password');

    if (authToken && !isLoginOrRegister) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url }
          });
        }

        if (error.status === 403) {
          console.error('Access Denied:', error.message);
        }

        console.error('HTTP Error:', error);
        return throwError(() => error);
      })
    );
  }
}
