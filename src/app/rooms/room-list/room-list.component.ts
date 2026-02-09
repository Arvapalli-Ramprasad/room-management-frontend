import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';
import { AddRoomComponent } from '../add-room/add-room.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit, OnDestroy {

  rooms: any[] = [];
  searchTerm: string = '';
  userName = 'Ramprasad';
  searchSubject: Subject<string> = new Subject<string>();
  searchSubscription!: Subscription;

  displayedColumns: string[] = ['roomNumber', 'buildingName', 'monthlyRent', 'ownerContact', 'actions'];

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRooms();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => {
      if (search.trim()) {
        this.searchRooms(search);
      } else {
        this.fetchRooms();
      }
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  fetchRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data: any) => {
        this.rooms = data.content;
        
      },
      error: (err) => console.error('Error fetching rooms', err)
    });
  }

  searchRooms(keyword: string): void {
    this.roomService.searchRooms(keyword).subscribe({
      next: (data: any) => {
        this.rooms = data.content;
        
      },
      error: (err) => console.error('Error searching rooms', err)
    });
  }

  onSearchInputChange(value: string): void {
    this.searchSubject.next(value);
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchRooms();
      }
    });
  }

  editRoom(room: any): void {
    // handle room edit
  }

  deleteRoom(room: any): void {
    // handle delete
  }

  openRoomDetails(room: any): void {
    this.router.navigate(['/rooms', room.id]);
  }
}
