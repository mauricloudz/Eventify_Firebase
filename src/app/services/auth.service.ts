import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;
  private userData: User | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.afAuth.setPersistence('local'); // Configura la persistencia local
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.userId = user.uid;
        await this.setSession(this.userId);
        this.userData = await this.loadUserData(this.userId);
      } else {
        this.userId = null;
        this.userData = null;
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.userId = userCredential.user?.uid || null;
      console.log(`Usuario logueado con ID: ${this.userId}`);
      await this.setSession(this.userId);
      this.userData = await this.loadUserData(this.userId);
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.userId = null;
    this.userData = null;
    await this.afAuth.signOut();
    await this.storageService.clearSession();
  }

  getUserId(): string | null {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserData(): User | null {
    return this.userData;
  }

  isLoggedIn(): boolean {
    return this.userId !== null;
  }

  private async setSession(userId: string): Promise<void> {
    await this.storageService.setSession({ userId });
  }

  private async loadUserData(userId: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.userService.getUser(userId).subscribe({
        next: (userData: User | null) => resolve(userData),
        error: (error: any) => reject(error)
      });
    });
  }
}