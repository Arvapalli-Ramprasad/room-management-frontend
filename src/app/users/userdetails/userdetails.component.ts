import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

/* TYPE MUST BE OUTSIDE THE CLASS */
type EditableField =
  | 'gender'
  | 'dateOfBirth'
  | 'address'
  | 'phoneNumber'
  | 'emergencyContact';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  userId!: string;
  user: any;

  /* SIMPLE OBJECT (NOT FormRecord) */
  editMode: Record<EditableField, boolean> = {
    gender: false,
    dateOfBirth: false,
    address: false,
    phoneNumber: false,
    emergencyContact: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: data => this.user = data,
      error: err => console.error(err)
    });
  }

  openRoomDetails(roomId: string): void {
    if (!roomId) return;
    this.router.navigate(['/rooms', roomId]);
  }

  /* ================= INLINE EDIT LOGIC ================= */

  enableEdit(field: EditableField): void {
    // reset all fields
    Object.keys(this.editMode).forEach(
      key => this.editMode[key as EditableField] = false
    );

    this.editMode[field] = true;
  }

  cancelEdit(field: EditableField): void {
    this.editMode[field] = false;
  }

  saveField(field: EditableField): void {
    this.editMode[field] = false;

    // 🔥 Backend PATCH call goes here
    console.log(`Updated ${field}:`, this.user[field]);

    /*
    this.userService.updateUserField(this.userId, {
      [field]: this.user[field]
    }).subscribe();
    */
  }
}
