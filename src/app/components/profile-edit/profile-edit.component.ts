import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
  @Input() profile: any;

  constructor(private modalController: ModalController, private userService: UserService) {}

  save() {
    const userId = 1; // ID del usuario logeado
    this.userService.updateUser(userId, { datos: [this.profile] }).subscribe(response => {
      console.log('Datos guardados', response);
      this.modalController.dismiss(this.profile);
    });
  }

  close() {
    this.modalController.dismiss();
  }
}