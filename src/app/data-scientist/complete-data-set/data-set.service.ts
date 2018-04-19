import { Injectable } from '@angular/core';
import { DataSet } from './data-set';

@Injectable()
export class DataSetService {

  constructor() { }

  get() {
    const data: DataSet[] = [
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
      {name: 'name', description: 'description', xComponent: 'x component', yComponent: 'y component'},
    ];
    return data;
  }

}
