import { Injectable } from '@angular/core';
import { List } from '../interfaces/List';

@Injectable({
  providedIn: 'root'
})
export class MocksService {

  constructor() { }

  getLists(): List[] {
    return [
      {
        name: 'Lista 1',
        creationDate: '28 Ene 14:45'
      },
      {
        name: 'Lista 2',
        creationDate: '14 Mar 4:05'
      },
      {
        name: 'Lista 124543454524',
        creationDate: '2 Sep 16:30'
      }
    ]
  }
}
