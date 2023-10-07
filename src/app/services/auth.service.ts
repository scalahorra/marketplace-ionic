import { Injectable } from '@angular/core';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

  private userInfo$ = new BehaviorSubject<User | null | undefined>(null);

  constructor() {}

  get getUserInfo() {
    return this.userInfo$.asObservable();
  }

  set setUserInfo(value: any) {
    console.log('Información de usuario: ', value);
    this.userInfo$.next(value);
  }

  checkAuthStatus() {
    onAuthStateChanged(this.auth, status => {
      if (status) {
        this.setUserInfo = this.mapUserInfoAuth(status);
      } else {
        this.setUserInfo = null;
      }
    });
  }

  registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  mapUserInfoAuth(auth: any): User {
    const user: User = {
      accessToken: auth.accessToken,
      email: auth.email,
      emailVerified: auth.emailVerified,
      name: auth.displayName,
      phoneNumber: auth.phoneNumber,
      photoUrl: auth.photoURL
    }
    return user;
  }

}