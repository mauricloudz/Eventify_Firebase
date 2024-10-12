import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventPage } from '../create-event/create-event.page'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private modalController: ModalController) { }

  // Método para abrir el modal con la página de creación de eventos
  async openCreateEventModal() {
    const modal = await this.modalController.create({
      component: CreateEventPage, // Carga la página como modal
      cssClass: 'create-event-modal'
    });
    return await modal.present();
  }
}
