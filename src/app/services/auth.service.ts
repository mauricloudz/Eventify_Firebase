import { Injectable } from '@angular/core';
import { StorageService } from './storage.service'; // Importar StorageService

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: number | null = null;

  constructor(private storageService: StorageService) {} // Inyectar StorageService

  async login(userId: number) {
    this.userId = userId;
    console.log(`Usuario logueado con ID: ${userId}`);
    await this.setSession(userId); // Guardar el estado de la sesión
  }

  async logout() {
    this.userId = null;
    await this.storageService.clearSession(); // Eliminar el estado de la sesión
  }

  getUserId(): number | null {
    return this.userId;
  }

  isLoggedIn(): boolean {
    return this.userId !== null;
  }

  private async setSession(userId: number) {
    await this.storageService.setSession({ userId }); // Guardar el estado de la sesión
  }

  setUserId(userId: number) {
    this.userId = userId; // Establecer el ID de usuario
  }
}