import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Room } from 'src/app/models/room.model';
import { UserFormComponent } from 'src/app/users/user-form/user-form.component';

@Component({
  selector: 'app-room-edit-dialog',
  templateUrl: './room-edit-dialog.component.html',
  styleUrls: ['./room-edit-dialog.component.css']
})
export class RoomEditDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public room: Room,
    public dialogRef: MatDialogRef<RoomEditDialogComponent>,
      private dialog: MatDialog  // <-- Add this

  ) {}

  saveChanges() {
    // TODO: Send updated room to backend
    this.dialogRef.close('updated');
  }

  openAddCandidateDialog(): void {
  const dialogRef = this.dialog.open(UserFormComponent, {
    width: '400px',
    data: { roomId: this.room.id }
  });

  dialogRef.afterClosed().subscribe(newStudentId => {
    if (newStudentId) {
      this.room.studentIds = this.room.studentIds || [];
      this.room.studentIds.push(newStudentId);
    }
  });
}
}
