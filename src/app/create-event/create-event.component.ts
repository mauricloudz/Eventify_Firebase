import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent {

  constructor(private modalController: ModalController) { }

  // Método para manejar el envío del formulario
  onSubmit() {
    console.log('Evento creado');
    alert('Evento creado con éxito');
    this.closeModal();
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }
}
