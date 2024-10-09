import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.userService.register({ username, email, password }).subscribe(
        response => {
          console.log('User registered successfully', response);
          // Manejar la respuesta exitosa, como redirigir al usuario o mostrar un mensaje
        },
        error => {
          console.error('Error registering user', error);
          // Manejar el error, como mostrar un mensaje de error
        }
      );
    }
  }
}