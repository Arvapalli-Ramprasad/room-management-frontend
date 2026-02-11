import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiBaseUrl = environment.apiUrl+'/rooms';

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/getAllRooms`);
  }

  searchRooms(term: string): Observable<Room[]> {
  return this.http.get<Room[]>(`${this.apiBaseUrl}/search/${term}`);
}

  getRoomById(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiBaseUrl}/getRoom?id=${id}`);
  }

  addRoom(room: Room): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/addRoom`, room);
  }

  updateRoom(id: string, room: Room): Observable<Room> {
    return this.http.put(`${this.apiBaseUrl}/updateRoom/${id}`, room);
  }

  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/deleteRoom/${id}`);
  }
  createRoom(roomData: Room): Observable<Room> {
    return this.http.post(`${this.apiBaseUrl}/add`, roomData);
  }

  uploadRoomPhotos(roomId: string, files: File[]): Observable<string[]> {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  return this.http.post<string[]>(
    `${this.apiBaseUrl}/${roomId}/photos`,
    formData
  );
}


}
