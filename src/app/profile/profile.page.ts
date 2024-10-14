import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profileImage: string | null = null; // Aquí se almacena la imagen del perfil
  profile = {
    nombre: '',
    apellidos: '',
    edad: null,
    whatsapp: '',
    carrera: '',
    sede: '',
    recibirNotificaciones: false,
    mostrarPublico: false
  };

  constructor() { }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Lógica para manejar el envío de datos del perfil
    console.log('Perfil actualizado');
    alert('Cambios guardados con éxito');
  }
  //método para las fotografías
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Permite elegir entre cámara o galería
    });

    this.profileImage = image?.dataUrl || null; // Guardamos la imagen en formato DataURL
  }
}

