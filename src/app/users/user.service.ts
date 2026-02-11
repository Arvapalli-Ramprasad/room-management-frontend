import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  guardianName: string;
  guardianContact: string;
  photoUrl: string;
  roomId: string;
  moveInDate: string;
  moveOutDate: string;
  monthlyPayment: number;
  totalPaid: number;
  pendingAmount: number;
  active: boolean;
  expenseIds: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl+'/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
  return this.http.get<any>(`${this.apiUrl}/getAllUsers`).pipe(
    map(res => res.content)  // ✅ extract just the array
  );
}

 addUser(user: User, roomId: string): Observable<User> {
  const params = { roomId };
  return this.http.post<User>(`${this.apiUrl}/add`, user, { params });
}


  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/updateUser`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser?id=${id}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUser?id=${id}`);
  }

  searchUsers(text: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search/${text}`);
  }
}
