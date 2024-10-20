import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../components/profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any = {};

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private authService: AuthService,
    private modalController: ModalController,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    const userId = await this.authService.getUserId(); 
  
    if (userId !== null) {
      this.userService.getUser(userId).subscribe((data: any) => {
        this.profile = data?.datos[0] || {};
      });
    } else {
      console.error('No se encontró un userId válido');
      this.profile = {};
    }
  }
  

  goBack() {
    this.navCtrl.back();
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: ProfileEditComponent,
      componentProps: { profile: this.profile }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.profile = data.data;
      }
    });

    return await modal.present();
  }

  async logout() {
    await this.authService.logout(); // Llamar al método logout de AuthService
    this.router.navigate(['/login']);
  }
}