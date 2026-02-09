import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your existing components
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { RoomItemComponent } from './rooms/room-item/room-item.component';
import { RoomEditDialogComponent } from './rooms/room-edit-dialog/room-edit-dialog.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { LandingDashboardComponent } from './auth/landing-dashboard/landing-dashboard.component';
import { SetupPasswordComponent } from './auth/setup-password/setup-password.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'setup-password', component: SetupPasswordComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/details/:id', component: UserdetailsComponent},

  { path: 'users/add',component: UserFormComponent},

  { path: 'rooms', component: RoomListComponent},
  { path: 'rooms/:id',component: RoomItemComponent},
  { path: 'rooms/item', component: RoomItemComponent},
  { path: 'rooms/edit', component: RoomEditDialogComponent},
  { path: 'rooms/add', component: AddRoomComponent},
  { path: 'expenses', component: ExpenseListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
