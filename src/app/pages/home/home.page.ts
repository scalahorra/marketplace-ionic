import { Component, OnInit } from '@angular/core';
import { List } from '../../interfaces/List';
import { MocksService } from 'src/app/services/mocks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mocked: boolean = true;
  lists: List[] = [];

  constructor( private mockService: MocksService ) {}

  ngOnInit(): void {

    if (this.mocked) {
      this.lists = this.mockService.getLists();
    }

  }

}
