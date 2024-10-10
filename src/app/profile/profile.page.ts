import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor() { }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Lógica para manejar el envío de datos del perfil
    console.log('Perfil actualizado');
    alert('Cambios guardados con éxito');
  }
}

