import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: number | null = null;

  constructor() {}

  login(userId: number) {
    this.userId = userId;
    console.log(`Usuario logueado con ID: ${userId}`); // Añade un log para verificar el ID
    // Aquí puedes añadir lógica adicional para manejar el login, como guardar tokens, etc.
  }

  logout() {
    this.userId = null;
    // Aquí puedes añadir lógica adicional para manejar el logout, como eliminar tokens, etc.
  }

  getUserId(): number | null {
    return this.userId;
  }

  isLoggedIn(): boolean {
    return this.userId !== null;
  }
}