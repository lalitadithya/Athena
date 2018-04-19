import { Injectable } from '@angular/core';
import { ParameterBase } from '../dashboard/parameter-base';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ParameterText } from '../dashboard/parameter-text-input';

@Injectable()
export class ParamaterService {

  constructor() { }

  toFormGroup(parameters: ParameterBase<any>[]) {
    let group: any = {};

    parameters.forEach(parameter => {
      group[parameter.key] = new FormControl(parameter.value, Validators.required);
    })

    return new FormGroup(group);
  }

  getParameters() {
    let parameters: ParameterBase<any>[] = [
      new ParameterText({
        key: 'parameter1',
        label: 'This a label',
        value: '',
        required: true,
        order: 1
      }),
      new ParameterText({
        key: 'parameter2',
        label: 'This a label 2',
        value: '',
        required: true,
        order: 2
      }),
      new ParameterText({
        key: 'parameter3',
        label: 'This a label 3',
        value: '',
        required: true,
        order: 3
      })
    ];

    return parameters.sort((a, b) => a.order - b.order);
  }
}
