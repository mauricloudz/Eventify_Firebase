import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage {
  authForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService, // Inyectamos AuthService
    private utilsSvc: UtilsService
  ) {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      try {
        await this.authService.login(this.authForm.value.email, this.authForm.value.password);
        this.router.navigate(['/tabs/dashboard']);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          this.showAlert('Usuario no existe');
        } else if (error.code === 'auth/wrong-password') {
          this.showAlert('Clave incorrecta');
        } else {
          this.showAlert('Error de autenticación');
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 3000,
            color: 'primary'
          });
        }
      } finally {
        loading.dismiss();
      }
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message,
      buttons: ['Reintentar']
    });
    await alert.present();
  }
}