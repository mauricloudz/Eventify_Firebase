import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  register(user: User): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        const userId = userCredential.user?.uid;
        return this.firestore.collection('users').doc(userId).set({
          username: user.username,
          email: user.email,
          nivel: 1,
          datos: [{
            nombre: "",
            apellido: "",
            edad: "",
            whatsapp: "",
            carrera: "",
            sede: "",
            profilePhoto: ""
          }],
          events: []
        });
      });
  }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }

  getUser(userId: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(userId).valueChanges();
  }

  updateUser(userId: string, datos: any): Promise<void> {
    return this.firestore.collection('users').doc(userId).update(datos);
  }
}