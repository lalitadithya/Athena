import { Injectable } from '@angular/core';
import { Algorithm } from '../models/algorithm'

@Injectable()
export class AlgorithmService {

  constructor() { }

  get() {
    let algorithms: Algorithm[] = [
      { id: '1', description: 'desc1', name: 'algo1' },
      { id: '2', description: 'desc2', name: 'algo2' },
      { id: '3', description: 'desc3', name: 'algo3' },
      { id: '4', description: 'desc4', name: 'algo4' }
    ];
    return algorithms;
  }
}
