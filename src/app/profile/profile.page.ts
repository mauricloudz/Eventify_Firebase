import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
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
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const userId = this.authService.getUserId(); // Obtener el ID del usuario logueado
    if (userId !== null) {
      this.userService.getUser(userId).subscribe((data: any) => {
        this.profile = data.datos[0];
      });
    } else {
      // Manejar el caso en que no hay usuario logueado
      console.error('No user logged in');
    }
  }

  goBack() {
    this.navCtrl.back(); // Navega hacia atrás
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
}