import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<AddRoomComponent>
  ) {
    this.roomForm = this.fb.group({
      roomNumber: ['', Validators.required],
      floorNumber: [''],
      buildingName: [''],
      totalCapacity: [1, Validators.required],
      monthlyRent: [0, Validators.required],
      currentOccupancy: [0],
      securityDeposit: [0],
      address: [''],
      roomType: [''],
      furnishingStatus: [''],
      sharedBathroom: [false],
      ownerContact: [''],
      active: [true],
      totalAmountCollected: [0]
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (er) => console.error('Room creation failed', er),
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
