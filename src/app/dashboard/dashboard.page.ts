import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CreateEventComponent } from '../create-event/create-event.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  categories = [
    { name: 'Talleres', icon: 'construct-outline' },
    { name: 'Desafíos', icon: 'ribbon-outline' },
    { name: 'Mentorías', icon: 'people-circle-outline' },
    { name: 'Charlas', icon: 'mic-outline' },
    { name: 'Stands', icon: 'megaphone-outline' }
  ];

  profile: any = {}; 

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService,
  ) {
    addIcons({ add });
  }

  async ngOnInit() {
    this.loadProfile(); 
  }

  async loadProfile() {
    const userId = await this.authService.getUserId();
  
    if (userId !== null) {
      this.userService.getUser(userId).subscribe(
        (data: any) => {
          if (data && data.datos && data.datos.length > 0) {
            this.profile = data.datos[0];
          } else {
            this.profile = {};
          }
        },
        (error: any) => {
          console.error('Error al cargar el perfil', error);
          this.profile = null;
        }
      );
    } else {
      console.error('No se encontró un userId válido');
      this.profile = {};
    }
  }

  // Método para abrir el modal con el componente de creación de eventos
  async openCreateEventModal() {
    setTimeout(async () => {
      const modal = await this.modalController.create({
        component: CreateEventComponent,
        cssClass: 'create-event-modal'
      });
      await modal.present();
    }, 300);
  }

  openCategoryDetails(categoryName: string) {
    this.navCtrl.navigateForward(`/category-details/${categoryName}`);
  }
}
