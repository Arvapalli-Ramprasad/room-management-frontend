import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomItemComponent } from './room-item/room-item.component';
import { RoomListComponent } from './room-list/room-list.component';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { AddRoomComponent } from './add-room/add-room.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoomEditDialogComponent } from './room-edit-dialog/room-edit-dialog.component';
import { MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";




@NgModule({
  declarations: [
    RoomItemComponent,
    RoomListComponent,
    AddRoomComponent,
    RoomEditDialogComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule
]
})
export class RoomsModule { }
