import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit{
  eventForm: FormGroup = new FormGroup({});
    categories = [
      { name: 'Talleres' },
      { name: 'Desafíos' },
      { name: 'Mentorías' },
      { name: 'Charlas' },
      { name: 'Stands' },
    ];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.eventForm = this.formBuilder.group({
      sede: ['', Validators.required],
      tipoActividad: ['', Validators.required],
      tituloEvento: ['', Validators.required],
      fechaActividad: ['', Validators.required],
      horarioInicio: ['', Validators.required],
      horarioTermino: ['', Validators.required],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.eventForm.valid) {
      console.log('Evento creado', this.eventForm.value);
      alert('Evento creado con éxito');
      this.closeModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }
}
