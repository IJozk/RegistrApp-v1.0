import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore)

  // Autenticación

  // Ingresar
  ingresar(user: User){
    return signInWithEmailAndPassword( getAuth(), user.email, user.password);
  }

  // Registro
  registro(user: User){
    return createUserWithEmailAndPassword( getAuth(), user.email, user.password);
  }

  // Actualizar usuario
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }

  // Enviar email para restablecer contraseña
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Setear documento
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  // obtener documento
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }
    
}