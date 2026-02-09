import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from 'src/app/users/user-form/user-form.component';
import { Room } from 'src/app/models/room.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css']
})
export class RoomItemComponent implements OnInit {
  room!: Room;
  editedRoom!: Room;
  isLoading: boolean = true;
  roomId!: string;  // <-- Define at class level
  selectedFiles: File[] = [];

  //now added
  selectedPhoto?: string;
  isFullscreen = false;
  fullscreenPhoto?: string;


  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.roomId = idParam;  // <-- Store it here
      this.roomService.getRoomById(this.roomId).subscribe({
        next: (room: Room) => {
          this.room = room;
          this.editedRoom = { ...room }; // Clone for editing
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load room:', err);
          this.isLoading = false;
        }
      });
    }
  }

  saveRoomChanges(): void {
    this.roomService.updateRoom(this.roomId, this.editedRoom).subscribe({
      next: (updatedRoom) => {
        console.log('Room updated successfully:', updatedRoom);
        this.room = updatedRoom;
        this.editedRoom = { ...updatedRoom };
      },
      error: (err) => {
        console.error('Error updating room:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadPhotos(): void {
    if (this.selectedFiles.length === 0) {
      alert('Please select at least one photo');
      return;
    }

    this.roomService.uploadRoomPhotos(this.roomId, this.selectedFiles)
      .subscribe({
        next: (photoUrls) => {
          // Update UI immediately
          this.editedRoom.photos = photoUrls;
          this.room.photos = photoUrls;
          alert('Photos uploaded successfully');
        },
        error: (err) => {
          console.error('Photo upload failed', err);
        }
      });
  }

  //now added
  setDefaultPhoto() {
    if (this.editedRoom?.photos?.length) {
      this.selectedPhoto = this.editedRoom.photos[0];
    }
  }

  selectPhoto(photo: string) {
    this.selectedPhoto = photo;
  }

  openFullscreen(photo?: string) {
    this.fullscreenPhoto = photo;
    this.isFullscreen = true;
  }

  closeFullscreen() {
    this.isFullscreen = false;
  }


  openAddCandidateDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { roomId: this.room.id }
    });

    dialogRef.afterClosed().subscribe((newStudentId: string) => {
      if (newStudentId) {
        this.editedRoom.studentIds = this.editedRoom.studentIds || [];
        this.editedRoom.studentIds.push(newStudentId);
      }
    });
  }

  navigateToUserForm() {
    const roomId = this.editedRoom.id;
    this.router.navigate(['/users/add'], { queryParams: { roomId } });
  }
}
