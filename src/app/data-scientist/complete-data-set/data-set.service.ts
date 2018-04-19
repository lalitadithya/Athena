import { Injectable } from '@angular/core';
import { DataSet } from './data-set';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataSetService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  get() {
    return this.http.get<DataSet[]>('http://localhost:57294/api/CompleteDataSets', {
      headers: this.headers
    });
  }

  post(dataSet) {
    return this.http.post('http://localhost:57294/api/CompleteDataSets', dataSet, {
      headers: this.headers
    });
  }
}
