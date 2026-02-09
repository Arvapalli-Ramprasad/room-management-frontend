import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  search(): void {
    if (this.searchText.trim()) {
      this.userService.searchUsers(this.searchText).subscribe(data => this.users = data);
    } else {
      this.loadUsers();
    }
  }

  editUser(user: User): void {
    this.router.navigate(['/edit-user', user.id]);
  }
}
