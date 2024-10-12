import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  constructor(private modalController: ModalController) { }

  // Método para abrir el modal con el componente de creación de eventos
  async openCreateEventModal() {
    const modal = await this.modalController.create({
      component: CreateEventComponent,
      cssClass: 'create-event-modal'
    });
    return await modal.present();
  }
}
