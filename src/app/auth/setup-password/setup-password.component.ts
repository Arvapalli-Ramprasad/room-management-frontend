import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent implements OnInit {
  setupForm: FormGroup;
  token: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.setupForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';

      console.log(this.token);
      console.log(this.email);
      
      if (!this.token || !this.email) {
        this.errorMessage = 'Invalid password setup link. Please contact support.';
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }

  onSubmit() {
    if (this.setupForm.valid) {
      const password = this.setupForm.get('password')?.value;
      
      // Call the API to update the password
      this.authService.setupStudentPassword(this.email, password, this.token).subscribe({
        next: (response: any) => {
          this.successMessage = 'Password set successfully! You can now log in.';
          this.errorMessage = '';
          
          // Redirect to login after a short delay
          setTimeout(() => {
            this.router.navigate(['/login'], { 
              queryParams: { email: this.email }
            });
          }, 2000);
        },
        error: (error) => {
          console.error('Error setting password:', error);
          this.errorMessage = error.error || 'Failed to set password. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(this.setupForm.controls).forEach(field => {
        const control = this.setupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
