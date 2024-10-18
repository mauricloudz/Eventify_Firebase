import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  canActivate(): Promise<boolean> {
    return this.storageService.getSession().then(session => {
      if (session && session.userId) {
        this.authService.setUserId(session.userId);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}