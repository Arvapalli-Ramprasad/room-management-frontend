import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ExpenseService } from 'src/app/expenses/expense.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  expenses: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  searchTerm: string = '';
  userName = 'Ramprasad';
  searchSubject: Subject<string> = new Subject<string>();
  searchSubscription!: Subscription;
  selectedRoomId?: number;

  displayedColumns: string[] = ['description', 'amount', 'category', 'createdAt', 'roomNumber', 'actions'];
  modules = [
  { key: 'room', label: 'Room Details', icon: 'meeting_room' },
  { key: 'users', label: 'Users', icon: 'people' },
  { key: 'expenses', label: 'Expenses', icon: 'receipt' },
  { key: 'payments', label: 'Payments', icon: 'payments' }
];

activeModule = 'room';


  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchExpenses();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => {
      if (search.trim()) {
        this.searchExpenses(search);
      } else {
        this.fetchExpenses();
      }
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  fetchExpenses(): void {
    this.expenseService.getUserExpenses().subscribe({
      next: (data: any) => {
        // Support both paginated { content: [] } and plain [] responses
        const rows = Array.isArray(data) ? data : (data?.content ?? []);
        this.expenses = rows || [];
        this.dataSource.data = this.expenses;
      },
      error: (err) => console.error('Error fetching expenses', err)
    });
  }

  searchExpenses(keyword: string): void {
    this.expenseService.searchExpenses(keyword).subscribe({
      next: (data: any) => {
        const rows = Array.isArray(data) ? data : (data?.content ?? []);
        this.expenses = rows || [];
        this.dataSource.data = this.expenses;
      },
      error: (err) => console.error('Error searching expenses', err)
    });
  }

  onSearchInputChange(value: string): void {
    this.searchSubject.next(value);
  }

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchExpenses();
      }
    });
  }

  editExpense(expense: any): void {
    // Implement edit functionality (open dialog or navigate)
  }

  deleteExpense(expense: any): void {
    this.expenseService.deleteExpense(expense.id).subscribe({
    next: () => {
      this.fetchExpenses(); // refresh table
    },
    error: err => console.error('Delete failed', err)
  });
    
  }

  openExpenseDetails(expense: any): void {
    // Optional: navigate to expense detail page
    this.router.navigate(['/expenses', expense.id]);
  }



  openModule(module: any): void {
  this.activeModule = module.key;
  console.log(module);

  switch (module.key) {
    case 'room':
      if (this.expenses[0]) {
        // this.router.navigate(['/rooms', this.selectedRoomId]);
        this.openRoomDetails(this.expenses[0])
      }
      break;

    case 'users':
      if (this.selectedRoomId) {
        this.router.navigate(['/users'], {
          queryParams: { roomId: this.selectedRoomId }
        });
      }
      break;

    case 'expenses':
      this.router.navigate(['/expenses']);
      break;

    case 'payments':
      // future
      break;
  }
}

  openRoomDetails(expense: any): void {
  if (!expense.roomId) {
    return;
  }

  console.log(expense);

  this.router.navigate(['/rooms', expense.roomId]);
}



openUserDetails(): void {
  if (!this.expenses[0].userId) {
    return;
  }
  console.log(this.expenses[0].userId)

  this.router.navigate(['users/details', this.expenses[0].userId]);
}





}
