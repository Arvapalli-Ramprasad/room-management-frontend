import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Pre-fill username if email is provided in query params
    this.route.queryParams.subscribe((params: any) => {
      if (params['email']) {
        this.loginForm.patchValue({
          username: params['email']
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log("i am here",res);
          localStorage.setItem('token', res.token);

           // Decode JWT to get role
          const decoded: any = jwtDecode(res.token);
          const role = decoded.role ? decoded.role[0] : null;
          if (role) localStorage.setItem('role', role);
          
          // Redirect based on user role
          const redirectUrl = this.auth.redirectBasedOnRole();
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error (e.g., show error message)
        }
      });
    }
  }
}
