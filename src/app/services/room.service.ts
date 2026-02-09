import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/rooms';

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllRooms`);
  }

  searchRooms(term: string): Observable<Room[]> {
  return this.http.get<Room[]>(`${this.apiUrl}/search/${term}`);
}

  getRoomById(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/getRoom?id=${id}`);
  }

  addRoom(room: Room): Observable<any> {
    return this.http.post(`${this.apiUrl}/addRoom`, room);
  }

  updateRoom(id: string, room: Room): Observable<Room> {
    return this.http.put(`${this.apiUrl}/updateRoom/${id}`, room);
  }

  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteRoom/${id}`);
  }
  createRoom(roomData: Room): Observable<Room> {
    return this.http.post(`${this.apiUrl}/add`, roomData);
  }

  uploadRoomPhotos(roomId: string, files: File[]): Observable<string[]> {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  return this.http.post<string[]>(
    `http://localhost:8080/rooms/${roomId}/photos`,
    formData
  );
}


}
