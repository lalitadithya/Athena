import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Element } from './data-set';

@Injectable()
export class DataSetServiceService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  get() {
    return this.http.get<Element[]>('http://athena.a2hosted.com/api/DataSets', {
      headers: this.headers
    });
  }

}
