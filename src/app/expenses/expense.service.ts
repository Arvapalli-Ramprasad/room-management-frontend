import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Expense {
  id?: string;
  amount?: number;
  description?: string;
  date?: string;
  category?: string;
  paymentMethod?: string;
  userId?: string;
  userName?: string;
  roomId?: string;
  roomNumber?: string;
  splits?: any[];
  paid?: boolean;
  paymentReceiptUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
  attachmentUrls?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiBaseUrl = environment.apiUrl+'/expences';

  constructor(private http: HttpClient) { }

  // // Get expense by id
  // getExpenseById(id: string): Observable<Expense> {
  //   return this.http.get<Expense>(`${this.baseUrl}/${id}`);
  // }

  // Add new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiBaseUrl}/addExpense`, expense);
  }

  // // Update expense (PUT)
  // updateExpense(id: string, expense: Expense): Observable<Expense> {
  //   return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
  // }

  // // Partial update (PATCH)
  // patchExpense(id: string, expense: Partial<Expense>): Observable<Expense> {
  //   return this.http.patch<Expense>(`${this.baseUrl}/${id}`, expense);
  // }

  // Delete expense by id
  deleteExpense(id: string): Observable<String> {

     return this.http.delete(`${this.apiBaseUrl}/${id}`, {
      responseType: 'text'
    });
  }

  // // Get all expenses of a user
  // getExpensesByUser(userId: string): Observable<Expense[]> {
  //   return this.http.get<Expense[]>(`${this.baseUrl}/user/${userId}`);
  // }

  // Search expenses4
  searchExpenses(text: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiBaseUrl}/search/${text}`);
  } 

  // // Get all expenses by room
  // getExpensesByRoom(roomId: string): Observable<Expense[]> {
  //   return this.http.get<Expense[]>(`${this.baseUrl}/getAllExpensesByRoomId?roomId=${roomId}`);
  // }

  // // Delete all expenses
  // deleteAllExpenses(): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/deleteAllExpenses`);
  // }

  // Optional: get all expenses (if backend has generic get all)
  getAllExpenses(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/getAllExpensesByRoomId`);
  }

  getUserExpenses(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/userExpenses`);
  }

}
