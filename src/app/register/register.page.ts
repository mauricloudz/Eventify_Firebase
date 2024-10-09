import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../services/password-validator.service'; // Importamos validador de clave
import { AlertController } from '@ionic/angular'; // Importamos AlertController
import { Router } from '@angular/router'; // Importamos Router

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
      const user = {
        id: null,
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
      };
      this.userService.register(user).subscribe({
        next: async res => {
          console.log('User registered successfully', res);
          const alert = await this.alertController.create({
            message: 'Usuario creado exitosamente.',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']); // Redirige a la página de login
              }
            }]
          });
          await alert.present();
        },
        error: err => {
          console.error('Error registering user', err);
          // Manejar el error, como mostrar un mensaje de error
        }
      });
    }
  }
}