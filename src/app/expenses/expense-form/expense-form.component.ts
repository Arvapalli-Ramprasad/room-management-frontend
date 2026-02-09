import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService, Expense } from 'src/app/expenses/expense.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {

  expenseForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private dialogRef: MatDialogRef<ExpenseFormComponent>
  ) {
    this.expenseForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      paymentMethod: ['CASH', Validators.required],
      notes: [''],
      attachmentUrls: [[]],
      paid: [false]
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expense: Expense = this.expenseForm.value;

      this.expenseService.addExpense(expense).subscribe({
        next: (res) => {
          this.successMessage = 'Expense added successfully!';
          this.errorMessage = '';
          // Form reset not required as dialog will close; backend sets timestamps
          // Close dialog and signal success to parent so it can refresh the list
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error adding expense:', err);
          this.errorMessage = 'Failed to add expense. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
