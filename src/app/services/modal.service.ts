import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private isOpen = new BehaviorSubject<boolean>(false);

  constructor() { }

  get getIsOpen(): Observable<boolean> {
    return this.isOpen.asObservable();
  }

  set setIsOpen(value: boolean) {
    this.isOpen.next(value);
  }
}
