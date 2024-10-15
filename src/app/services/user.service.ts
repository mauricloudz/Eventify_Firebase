import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) { }

  register(userData: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, datos: { nombre: string, apellido: string, edad: string, whatsapp: string, carrera: string, sede: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, { datos: [datos] });
  }

}