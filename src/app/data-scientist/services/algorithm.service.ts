import { Injectable } from '@angular/core';
import { Algorithm } from '../models/algorithm';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AlgorithmService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  get() {
    return this.http.get<Algorithm[]>('http://athena.a2hosted.com/api/Algorithm', {
      headers: this.headers
    });
  }
}
