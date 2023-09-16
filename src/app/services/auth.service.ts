import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

  constructor() {}

  checkAuthStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, user => {
        console.log(user);
        resolve(user);
      }, reject);
    });
  }

  registerWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

}