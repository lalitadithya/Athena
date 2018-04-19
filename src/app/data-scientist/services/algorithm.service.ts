import { Injectable } from '@angular/core';
import { Algorithm } from '../models/algorithm'

@Injectable()
export class AlgorithmService {

  constructor() { }

  get() {
    let algorithms: Algorithm[] = [
      { id: '1', description: 'desc1', name: 'algo1' },
      { id: '2', description: 'desc1', name: 'algo1' },
      { id: '3', description: 'desc1', name: 'algo1' },
      { id: '4', description: 'desc1', name: 'algo1' }
    ];
    return algorithms;
  }
}
