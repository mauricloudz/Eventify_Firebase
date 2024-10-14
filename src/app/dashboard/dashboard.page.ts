import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from '../create-event/create-event.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  constructor(private modalController: ModalController) {
    addIcons({ add });
  }

  // Método para abrir el modal con el componente de creación de eventos
  async openCreateEventModal() {
    setTimeout(async () => {
      const modal = await this.modalController.create({
        component: CreateEventComponent,
        cssClass: 'create-event-modal'
      });
      await modal.present();
    }, 300); // 1000 milisegundos = 1 segundo
  }
}
