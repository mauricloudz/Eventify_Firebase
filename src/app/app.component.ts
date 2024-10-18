import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService // Inyectar AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkSession();
    });
  }

  async checkSession() {
    const session = await this.storageService.getSession();
    setTimeout(() => {
      if (session && session.userId) {
        this.authService.setUserId(session.userId);
        this.router.navigate(['/tabs/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    }, 100);
  }

  ngOnInit() {}
}