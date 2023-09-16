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

  private authStatus$ = new BehaviorSubject<any>(null);
  private userInfo$ = new BehaviorSubject<User | null | undefined>(null);

  constructor() {}

  getAuthStatus() {
    return this.authStatus$.asObservable();
  }

  setAuthStatus(status: any) {
    this.authStatus$.next(status);
  }

  getUserInfo() {
    return this.userInfo$.asObservable();
  }

  setUserInfo(userInfo: any) {
    this.userInfo$.next(userInfo);
  }

  checkAuthStatus() {
    onAuthStateChanged(this.auth, status => {
      this.setAuthStatus(status)
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