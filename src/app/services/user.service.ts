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
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, userData);
  }
}