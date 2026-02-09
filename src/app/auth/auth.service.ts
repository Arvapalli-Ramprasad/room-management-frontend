import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


// http://localhost:8080/auth/addNewUser

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth' || 'http://localhost:8080/auth';
  private baseUrl1 = environment.apiUrl1;




  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addNewUser`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/generateToken`, data);
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  setupStudentPassword(email: string, password: string, token: string): Observable<any> {
    // Match the backend's expected request format
    return this.http.post(`${this.baseUrl1}/set-password?token=${encodeURIComponent(token)}`, {
      password: password
    });
  }

  // Add this method to check user role after login
  redirectBasedOnRole() {
    const role = this.getRole();
    console.log(localStorage);
    console.log(role);
    if (role === 'ROLE_ADMIN') {
      return '/rooms'; // Admin dashboard
    } else {
      return '/expenses'; // Regular user expenses page
    }
  }
}
