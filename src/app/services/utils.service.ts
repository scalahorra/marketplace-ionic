import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  labels: any;

  constructor(private http: HttpClient) { }

  loadLabels() {
    this.http.get('assets/labels.json').subscribe((labels) => {
      this.labels = labels;
    });
  }
}
