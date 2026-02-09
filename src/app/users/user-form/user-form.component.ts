import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../user.service';
import { UserInfo } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  roomId!: string;
  genders = ['Male', 'Female'];


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
      const roomId = this.route.snapshot.queryParamMap.get('roomId');
      if (!roomId) {
        throw new Error('roomId is required in query params');
      }
      this.roomId = roomId;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: [''],
      dateOfBirth: [''],
      address: [''],
      emergencyContact: [''],
      guardianName: [''],
      guardianContact: [''],
      photoUrl: [''],
      monthlyPayment: [0],
      totalPaid: [0],
      pendingAmount: [0],
      active: [true],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const user: User = this.userForm.value;
    this.userService.addUser(user,this.roomId).subscribe({
      next: (res) => {
        console.log('User added:', res);
        this.router.navigate(['/rooms']); // or wherever you want to go next
      },
      error: (err) => {
        console.error('Error adding user:', err);
      }
    });
  }
}
