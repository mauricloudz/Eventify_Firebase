import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { ProfileEditComponent } from '../components/profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any = {};

  constructor(private userService: UserService, private modalController: ModalController) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const userId = 1; // ID del usuario logeado
    this.userService.getUser(userId).subscribe((data: any) => {
      this.profile = data.datos[0];
    });
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