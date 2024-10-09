import { Component } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage {

  constructor() { }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log('Formulario enviado');
    alert('Evento creado con éxito');
  }
}

