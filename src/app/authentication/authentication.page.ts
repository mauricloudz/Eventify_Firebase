import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service'; // Importamos AuthService

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage {

  authForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private authService: AuthService // Inyectamos AuthService
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      this.userService.getUsers().subscribe(users => {
        const user = users.find(u => u.email === email);
        if (!user) {
          this.showAlert('Usuario no existe');
        } else if (user.password !== password) {
          this.showAlert('Clave incorrecta');
        } else {
          this.authService.login(user.id); // Asegúrate de que el ID del usuario se pasa correctamente
          this.router.navigate(['/tabs/dashboard']);
        }
      });
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