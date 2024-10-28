import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  categories = [
    { name: 'Talleres', icon: 'construct-outline' },
    { name: 'Desafíos', icon: 'ribbon-outline' },
    { name: 'Mentorías', icon: 'people-circle-outline' },
    { name: 'Charlas', icon: 'mic-outline' },
    { name: 'Stands', icon: 'megaphone-outline' }
  ];

  profile: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
    addIcons({ add });
  }

  async ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (user) => {
          if (user) {
            this.profile = user.datos[0] || {};
          } else {
            console.error('No se encontraron datos del usuario');
            this.profile = {};
          }
        },
        error: (error) => {
          console.error('Error al cargar el perfil', error);
          this.profile = {};
        }
      });
    } else {
      console.error('No se encontró un userId válido');
      this.profile = {};
    }
  }

  openCategoryDetails(categoryName: string) {
    this.router.navigate([`/category-details/${categoryName}`]);
  }
}