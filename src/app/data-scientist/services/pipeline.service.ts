import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipeline } from '../models/pipeline';

@Injectable()
export class PipelineService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  get() {
    return this.http.get<Pipeline[]>('http://athena.a2hosted.com/api/Pipeline', {
      headers: this.headers
    });
  }

  post(data) {
    return this.http.post('http://athena.a2hosted.com/api/Pipeline', data, {
      headers: this.headers
    });
  }
}
