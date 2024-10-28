import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule} from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { TabsComponent } from './tabs/tabs.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { CreateEventComponent } from './create-event/create-event.component';

// Importar IonicStorageModule
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';

//Importar Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [TabsComponent, AppComponent, CreateEventComponent, ProfileEditComponent, EventDetailComponent], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Configurar IonicStorageModule
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(), // Inicializar Firebase
    AngularFireStorageModule
  ],
  providers: [
    { provide: SETTINGS, useValue: { persistence: true } },
    FirebaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}