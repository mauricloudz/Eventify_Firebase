import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventDetailComponent } from '../components/event-detail/event-detail.component';
import { FirebaseService } from '../services/firebase.service';
import { getDocs, collection } from '@angular/fire/firestore';
import { UtilsService } from '../services/utils.service'; // Importar UtilsService

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  events = []; // Aquí estarán los eventos traídos desde Firebase
  isLoading = true; // Variable para manejar el estado de carga

  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService,
    private utilsService: UtilsService // Inyectar UtilsService
  ) {}

  async ngOnInit() {
    // Obtener eventos desde Firebase
    this.loadEvents();
  }

  async loadEvents() {
    const loading = await this.utilsService.loading();
    await loading.present();

    try {
      const eventsCollection = this.firebaseService.getEvents();
      const querySnapshot = await getDocs(eventsCollection);

      this.events = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() as object }; // Convierte doc.data() en un objeto
      });
    } catch (error) {
      console.error('Error al cargar eventos', error);
    } finally {
      this.isLoading = false; // Cambiar el estado de carga
      loading.dismiss();
    }
  }

  async openEventDetail(event) {
    const modal = await this.modalController.create({
      component: EventDetailComponent,
      componentProps: { event: event }, // Pasar el evento seleccionado al modal
    });
    return await modal.present();
  }
}