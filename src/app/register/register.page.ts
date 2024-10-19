import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../services/password-validator.service'; // Importamos validador de clave
import { AlertController } from '@ionic/angular'; // Importamos AlertController
import { Router } from '@angular/router'; // Importamos Router
import { User } from '../models/user.model'; // Importamos el modelo User

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertController: AlertController, // Inyectamos AlertController
    private router: Router // Inyectamos Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator }); // Aplica el validador aquí
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      const user: User = {
        uid: null,
        username,
        email,
        password,
        nivel: 1, // Valor por defecto
        datos: [{
          nombre: "",
          apellido: "",
          edad: "",
          whatsapp: "",
          carrera: "",
          sede: ""
        }] // Array vacío por defecto
        ,
      };
      this.userService.register(user).then(async () => {
        const alert = await this.alertController.create({
          message: 'Usuario creado exitosamente.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }]
        });
        await alert.present();
      }).catch(err => {
        console.error('Error registering user', err);
        // Manejar el error, como mostrar un mensaje de error
      });
    }
  }
}