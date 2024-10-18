import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = localStorage;

  constructor() {}

  // Guardar estado de sesión
  async setSession(session: any) {
    this.storage.setItem('session', JSON.stringify(session));
  }

  // Recuperar estado de sesión
  async getSession() {
    const sessionData = this.storage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
  }

  // Eliminar estado de sesión
  async clearSession() {
    this.storage.removeItem('session');
  }
}